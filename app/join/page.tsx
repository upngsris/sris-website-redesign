"use client";

/**
 * UPNG SRIS — Join / Registration Page
 * /app/join/page.tsx
 *
 * Key design decisions:
 * - Single dynamic form with Zod schema that branches based on "category" (Student/Staff/Other)
 * - Email validation is conditional: UPNG domain enforced for Student & Staff
 * - Payment section conditionally requires Transaction ID (bank) or Receipt Number (cash)
 * - File upload is always required
 * - Simulated API call via setTimeout; success state shown inline
 */

import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Hero from "@/components/ui/Hero";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
// Navy: #0D1B2A  Gold/Orange: #E8870A  Light bg: #F5F6F8
// ─────────────────────────────────────────────────────────────────────────────

type Category = "student" | "staff" | "other";
type PaymentMethod = "bank" | "cash" | "";

// ─── Zod schema (conditional) ─────────────────────────────────────────────────
const buildSchema = (category: Category) =>
  z
    .object({
      // Section 1 – Personal
      fullName: z.string().min(2, "Full name must be at least 2 characters"),
      phone: z
        .string()
        .min(7, "Enter a valid phone number")
        .regex(/^\+?[\d\s\-()]+$/, "Invalid phone format"),
      email: z
        .string()
        .email("Enter a valid email")
        .refine(
          (val) =>
            category === "other" ? true : val.endsWith("@upng.ac.pg"),
          "Must use your UPNG email address (@upng.ac.pg)"
        ),
      gender: z.string().optional(),
      dob: z.string().optional(),

      // Section 2 – Academic / Professional (all optional at schema level; required enforced per-category below)
      yearOfStudy: z.string().optional(),
      schoolFaculty: z.string().optional(),
      major: z.string().optional(),
      department: z.string().optional(),
      position: z.string().optional(),
      occupation: z.string().optional(),
      organization: z.string().optional(),
      areaOfInterest: z.string().optional(),

      // Section 3 – Payment
      paymentMethod: z.enum(["bank", "cash"], {
        errorMap: () => ({ message: "Select a payment method" }),
      }),
      receiptFile: z
        .any()
        .refine((f) => f && f.length > 0, "Receipt upload is required"),
      transactionId: z.string().optional(),
      receiptNumber: z.string().optional(),
    })
    // Conditional: Student fields
    .refine(
      (d) =>
        category !== "student" ||
        (d.yearOfStudy && d.yearOfStudy.length > 0),
      { message: "Year of study is required", path: ["yearOfStudy"] }
    )
    .refine(
      (d) =>
        category !== "student" ||
        (d.schoolFaculty && d.schoolFaculty.length > 0),
      { message: "School / Faculty is required", path: ["schoolFaculty"] }
    )
    .refine(
      (d) =>
        category !== "student" || (d.major && d.major.length > 0),
      { message: "Major / Program is required", path: ["major"] }
    )
    // Conditional: Staff fields
    .refine(
      (d) =>
        category !== "staff" ||
        (d.department && d.department.length > 0),
      { message: "Department is required", path: ["department"] }
    )
    .refine(
      (d) =>
        category !== "staff" || (d.position && d.position.length > 0),
      { message: "Position is required", path: ["position"] }
    )
    // Conditional: Other fields
    .refine(
      (d) =>
        category !== "other" ||
        (d.occupation && d.occupation.length > 0),
      { message: "Occupation is required", path: ["occupation"] }
    )
    // Conditional: payment sub-fields
    .refine(
      (d) =>
        d.paymentMethod !== "bank" ||
        (d.transactionId && d.transactionId.length > 0),
      { message: "Transaction ID is required for bank transfer", path: ["transactionId"] }
    )
    .refine(
      (d) =>
        d.paymentMethod !== "cash" ||
        (d.receiptNumber && d.receiptNumber.length > 0),
      { message: "Receipt number is required for cash payment", path: ["receiptNumber"] }
    );

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

// ─── Small reusable field components ─────────────────────────────────────────

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="mt-1 text-xs text-red-500 font-medium">{msg}</p> : null;

const Label = ({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-semibold text-[#0D1B2A] mb-1.5"
  >
    {children}
    {required && <span className="text-[#E8621A] ml-0.5">*</span>}
  </label>
);

const inputCls =
  "w-full border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0D1B2A] placeholder:text-slate-400 focus:border-[#E8621A] focus:outline-none focus:ring-2 focus:ring-[#E8621A]/20 transition";

const selectCls =
  "w-full border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0D1B2A] focus:border-[#E8621A] focus:outline-none focus:ring-2 focus:ring-[#E8621A]/20 transition appearance-none";

// ─── Section header ───────────────────────────────────────────────────────────
const SectionHeader = ({
  step,
  title,
  subtitle,
}: {
  step: string;
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-start gap-4 mb-6">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8621A] flex items-center justify-center text-white text-xs font-bold">
      {step}
    </div>
    <div>
      <h3 className="text-base font-bold text-[#0D1B2A]">{title}</h3>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function JoinPage() {
  const [category, setCategory] = useState<Category>("student");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(buildSchema(category)),
    mode: "onBlur",
  });

  const paymentMethod = watch("paymentMethod") as PaymentMethod;

  // Switch category and reset form to clear stale validation state
  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    reset();
    setFileName(null);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API
    await new Promise((r) => setTimeout(r, 1800));
    console.log("Registration payload:", { category, ...data });
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      reset();
      setFileName(null);
    }, 4000);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        setFileName(file.name);
        // Create a synthetic FileList-like object for RHF
        const dt = new DataTransfer();
        dt.items.add(file);
        setValue("receiptFile", dt.files, { shouldValidate: true });
      }
    },
    [setValue]
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    
    <div className="min-h-screen bg-[#F5F6F8]">
      {/* ── Top Nav Bar ── 
      <header className="bg-[#0D1B2A] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo mark 
            <div className="w-7 h-7 bg-[#E8870A] flex items-center justify-center text-white font-black text-xs">
              S
            </div>
            <span className="text-white font-bold text-sm tracking-wide">
              UPNG <span className="text-[#E8870A]">SRIS</span>
            </span>
          </div>
          <a
            href="/portal"
            className="text-xs text-slate-400 hover:text-white transition font-medium"
          >
            Already a member? Sign in →
          </a>
        </div>
      </header>*/}

      {/* ── Hero strip ── */}
      {/* ══════════════════════════════════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0D1B2A]" aria-label="About page hero">
        <Hero
            backgroundImage="/assets/banner-image.jpg"
            badge={{ label: "Science, Research & Innovation Society" }}
            headline="Join UPNG SRIS"
            accentText="SRIS"
            subheading="Become part of a community of curious minds pushing the frontiers of
            science and innovation at the University of Papua New Guinea."
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "Join", href: "/join" },
            ]}
        />
      </section>t

      {/* ── Form card (pulls up over hero) ── */}
      <div className="max-w-2xl mx-auto px-4 -mt-8 pb-20">
        {success ? (
          <div className="bg-white shadow-xl border border-green-100 p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-400 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-black text-[#0D1B2A] mb-2">
              Application Submitted!
            </h2>
            <p className="text-slate-500 text-sm">
              Thank you for joining UPNG SRIS. Your membership application is
              under review. You&apos:ll receive a confirmation email within 2–3
              business days.
            </p>
            <div className="mt-6 w-full bg-slate-100 rounded-full h-1 overflow-hidden">
              <div className="h-1 bg-[#E8621A] animate-[shrink_4s_linear_forwards]" style={{ width: "100%", animation: "width 4s linear" }} />
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-xl border border-slate-100 overflow-hidden">
            {/* ── Category selector ── */}
            <div className="border-b border-slate-100 p-1.5 flex bg-slate-50">
              {(
                [
                  { key: "student", label: "UPNG Student" },
                  { key: "staff", label: "UPNG Staff" },
                  { key: "other", label: "Other" },
                ] as { key: Category; label: string }[]
              ).map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleCategoryChange(key)}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all ${
                    category === key
                      ? "bg-[#0D1B2A] text-white shadow-sm"
                      : "text-slate-500 hover:text-[#0D1B2A]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-10">
              {/* ── Section 1: Personal Details ── */}
              <section>
                <SectionHeader
                  step="1"
                  title="Personal Details"
                  subtitle="Your basic information — used for your membership profile."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <Label htmlFor="fullName" required>Full Name</Label>
                    <input
                      id="fullName"
                      {...register("fullName")}
                      placeholder="e.g. John Kopi"
                      className={inputCls}
                    />
                    <FieldError msg={errors.fullName?.message} />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" required>Phone Number</Label>
                    <input
                      id="phone"
                      {...register("phone")}
                      placeholder="+675 7xx xxxx"
                      className={inputCls}
                    />
                    <FieldError msg={errors.phone?.message} />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" required>Email Address</Label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder={
                        category === "other"
                          ? "your@email.com"
                          : "s12345678@upng.ac.pg"
                      }
                      className={inputCls}
                    />
                    {category !== "other" && (
                      <p className="mt-1 text-[10px] text-slate-400 font-medium">
                        Must end with @upng.ac.pg
                      </p>
                    )}
                    <FieldError msg={errors.email?.message} />
                  </div>

                  {/* Gender */}
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <div className="relative">
                      <select id="gender" {...register("gender")} className={selectCls}>
                        <option value="">Prefer not to say</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <input
                      id="dob"
                      type="date"
                      {...register("dob")}
                      className={inputCls}
                    />
                  </div>
                </div>
              </section>

              {/* ── Section 2: Academic / Professional ── */}
              <section>
                <SectionHeader
                  step="2"
                  title={
                    category === "student"
                      ? "Academic Details"
                      : category === "staff"
                      ? "Professional Details"
                      : "Professional Background"
                  }
                  subtitle="Help us understand your background within the society."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* STUDENT fields */}
                  {category === "student" && (
                    <>
                      <div>
                        <Label htmlFor="yearOfStudy" required>Year of Study</Label>
                        <div className="relative">
                          <select
                            id="yearOfStudy"
                            {...register("yearOfStudy")}
                            className={selectCls}
                          >
                            <option value="">Select year</option>
                            {["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Postgraduate"].map(
                              (y) => <option key={y} value={y}>{y}</option>
                            )}
                          </select>
                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                        </div>
                        <FieldError msg={errors.yearOfStudy?.message} />
                      </div>

                      <div>
                        <Label htmlFor="schoolFaculty" required>School / Faculty</Label>
                        <input
                          id="schoolFaculty"
                          {...register("schoolFaculty")}
                          placeholder="e.g. School of Natural & Physical Sciences"
                          className={inputCls}
                        />
                        <FieldError msg={errors.schoolFaculty?.message} />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="major" required>Major / Program</Label>
                        <input
                          id="major"
                          {...register("major")}
                          placeholder="e.g. Bachelor of Science (Computer Science)"
                          className={inputCls}
                        />
                        <FieldError msg={errors.major?.message} />
                      </div>
                    </>
                  )}

                  {/* STAFF fields */}
                  {category === "staff" && (
                    <>
                      <div>
                        <Label htmlFor="department" required>Department</Label>
                        <input
                          id="department"
                          {...register("department")}
                          placeholder="e.g. Department of Physics"
                          className={inputCls}
                        />
                        <FieldError msg={errors.department?.message} />
                      </div>
                      <div>
                        <Label htmlFor="position" required>Position / Title</Label>
                        <input
                          id="position"
                          {...register("position")}
                          placeholder="e.g. Senior Lecturer"
                          className={inputCls}
                        />
                        <FieldError msg={errors.position?.message} />
                      </div>
                    </>
                  )}

                  {/* OTHER fields */}
                  {category === "other" && (
                    <>
                      <div>
                        <Label htmlFor="occupation" required>Occupation</Label>
                        <input
                          id="occupation"
                          {...register("occupation")}
                          placeholder="e.g. Software Engineer"
                          className={inputCls}
                        />
                        <FieldError msg={errors.occupation?.message} />
                      </div>
                      <div>
                        <Label htmlFor="organization">Organization</Label>
                        <input
                          id="organization"
                          {...register("organization")}
                          placeholder="Optional"
                          className={inputCls}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="areaOfInterest">Area of Interest</Label>
                        <input
                          id="areaOfInterest"
                          {...register("areaOfInterest")}
                          placeholder="e.g. Biotechnology, Robotics, Data Science…"
                          className={inputCls}
                        />
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* ── Section 3: Payment ── */}
              <section>
                <SectionHeader
                  step="3"
                  title="Membership Payment"
                  subtitle="Annual membership fee applies. Upload proof of payment below."
                />

                {/* Pricing callout */}
                <div className="mb-5 flex gap-3">
                  {[
                    { label: "Student", price: "K20" },
                    { label: "Staff", price: "K50" },
                    { label: "Other", price: "K70" },
                  ].map((tier) => (
                    <div
                      key={tier.label}
                      className={`flex-1 border-2 p-3 text-center transition ${
                        (category === "student" && tier.label === "Student") ||
                        (category === "staff" && tier.label === "Staff") ||
                        (category === "other" && tier.label === "Other")
                          ? "border-[#E8621A] bg-[#E8870A]/5"
                          : "border-slate-100 bg-slate-50 opacity-50"
                      }`}
                    >
                      <div className="text-xs font-semibold text-slate-500">{tier.label}</div>
                      <div className="text-lg font-black text-[#0D1B2A]">{tier.price}</div>
                      <div className="text-[10px] text-slate-400">per year</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Payment Method */}
                  <div className="md:col-span-2">
                    <Label htmlFor="paymentMethod" required>Payment Method</Label>
                    <div className="relative">
                      <select
                        id="paymentMethod"
                        {...register("paymentMethod")}
                        className={selectCls}
                      >
                        <option value="">Select method…</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="cash">Cash</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                    </div>
                    <FieldError msg={errors.paymentMethod?.message} />
                  </div>

                  {/* Bank transfer → Transaction ID */}
                  {paymentMethod === "bank" && (
                    <div className="md:col-span-2">
                      <Label htmlFor="transactionId" required>Transaction ID / Reference</Label>
                      <input
                        id="transactionId"
                        {...register("transactionId")}
                        placeholder="e.g. BSP-20240501-XXXX"
                        className={inputCls}
                      />
                      <FieldError msg={errors.transactionId?.message} />
                    </div>
                  )}

                  {/* Cash → Receipt Number */}
                  {paymentMethod === "cash" && (
                    <div className="md:col-span-2">
                      <Label htmlFor="receiptNumber" required>Receipt Number</Label>
                      <input
                        id="receiptNumber"
                        {...register("receiptNumber")}
                        placeholder="e.g. RCP-00142"
                        className={inputCls}
                      />
                      <FieldError msg={errors.receiptNumber?.message} />
                    </div>
                  )}

                  {/* File upload */}
                  <div className="md:col-span-2">
                    <Label htmlFor="receiptFile" required>Upload Receipt / Proof of Payment</Label>
                    <Controller
                      name="receiptFile"
                      control={control}
                      render={({ field }) => (
                        <label
                          htmlFor="receiptFile"
                          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleDrop}
                          className={`flex flex-col items-center justify-center w-full border-2 border-dashed cursor-pointer transition py-8 px-4 text-center ${
                            dragOver
                              ? "border-[#E8621A] bg-[#E8870A]/5"
                              : errors.receiptFile
                              ? "border-red-300 bg-red-50"
                              : "border-slate-200 bg-slate-50 hover:border-[#E8621A]/50 hover:bg-[#E8870A]/5"
                          }`}
                        >
                          <svg className="w-8 h-8 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          {fileName ? (
                            <span className="text-sm font-semibold text-[#E8621A]">{fileName}</span>
                          ) : (
                            <>
                              <span className="text-sm font-semibold text-[#0D1B2A]">Drop file or click to browse</span>
                              <span className="text-xs text-slate-400 mt-1">JPG, PNG, PDF — max 5 MB</span>
                            </>
                          )}
                          <input
                            id="receiptFile"
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="sr-only"
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              setFileName(e.target.files?.[0]?.name ?? null);
                            }}
                          />
                        </label>
                      )}
                    />
                    <FieldError msg={errors.receiptFile?.message as string} />
                  </div>
                </div>
              </section>

              {/* ── Submit ── */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#E8621A] hover:bg-[#E8621A] active:bg-[#E8621A] text-white font-bold text-sm tracking-wide transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#E8870A]/30"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting Application…
                    </>
                  ) : (
                    "Submit Membership Application"
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-3">
                  By submitting you agree to the SRIS membership terms and code of conduct.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
