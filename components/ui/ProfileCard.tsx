import React from "react";
import { MailIcon, GlobeIcon, LinkedInIcon, OrcidIcon, ScholarIcon } from "../icons/Icons";

export interface SocialLinks {
  email?: string;
  website?: string;
  linkedin?: string;
  orcid?: string;
  googleScholar?: string;
}

export interface ProfileCardProps {
  name: string;
  role: string;
  department?: string;
  institution?: string;
  bio?: string;
  avatarUrl?: string;
  avatarAlt?: string;
  interests?: string[];
  socialLinks?: SocialLinks;
  variant?: "default" | "compact" | "horizontal";
  className?: string;
  onClick?: () => void;
}

// ── Avatar Fallback ──────────────────────────────────────────

const AvatarFallback: React.FC<{ name: string; size: "sm" | "md" | "lg" }> = ({
  name,
  size,
}) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const sizeClass = {
    sm:  "w-12 h-12 text-sm",
    md:  "w-20 h-20 text-xl",
    lg:  "w-24 h-24 text-2xl",
  }[size];

  return (
    <div
      className={`${sizeClass} rounded-full bg-gradient-to-br from-[#0a2342] to-[#1a3a5c] flex items-center justify-center text-white font-bold flex-shrink-0`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

// ── Social Link Button ───────────────────────────────────────

const SocialButton: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="p-1.5 rounded-md text-slate-400 hover:text-[#0a2342] hover:bg-[#0a2342]/8 transition-colors duration-150"
  >
    {icon}
  </a>
);

// ── Default Layout ───────────────────────────────────────────

const DefaultLayout: React.FC<ProfileCardProps> = ({
  name,
  role,
  department,
  institution,
  bio,
  avatarUrl,
  avatarAlt,
  interests = [],
  socialLinks = {},
}) => (
  <div className="flex flex-col items-center text-center gap-4">
    {/* Avatar */}
    <div className="relative">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={avatarAlt ?? name}
          className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md"
        />
      ) : (
        <AvatarFallback name={name} size="lg" />
      )}
    </div>

    {/* Identity */}
    <div>
      <h3 className="text-lg font-bold text-[#0a2342] tracking-tight">{name}</h3>
      <p className="text-sm font-semibold text-[#c9a84c] mt-0.5">{role}</p>
      {department && (
        <p className="text-xs text-slate-500 mt-0.5">{department}</p>
      )}
      {institution && (
        <p className="text-xs text-slate-400">{institution}</p>
      )}
    </div>

    {/* Bio */}
    {bio && (
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{bio}</p>
    )}

    {/* Research Interests */}
    {interests.length > 0 && (
      <div className="flex flex-wrap gap-1.5 justify-center">
        {interests.map((interest) => (
          <span
            key={interest}
            className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#0a2342]/8 text-[#0a2342] border border-[#0a2342]/15"
          >
            {interest}
          </span>
        ))}
      </div>
    )}

    {/* Social Links */}
    {Object.keys(socialLinks).length > 0 && (
      <div className="flex items-center gap-1 pt-1 border-t border-slate-100 w-full justify-center">
        {socialLinks.email && (
          <SocialButton href={`mailto:${socialLinks.email}`} icon={<MailIcon size={15} />} label="Email" />
        )}
        {socialLinks.website && (
          <SocialButton href={socialLinks.website} icon={<GlobeIcon size={15} />} label="Website" />
        )}
        {socialLinks.linkedin && (
          <SocialButton href={socialLinks.linkedin} icon={<LinkedInIcon size={15} />} label="LinkedIn" />
        )}
        {socialLinks.orcid && (
          <SocialButton href={socialLinks.orcid} icon={<OrcidIcon size={15} />} label="ORCID" />
        )}
        {socialLinks.googleScholar && (
          <SocialButton href={socialLinks.googleScholar} icon={<ScholarIcon size={15} />} label="Google Scholar" />
        )}
      </div>
    )}
  </div>
);

// ── Compact Layout ───────────────────────────────────────────

const CompactLayout: React.FC<ProfileCardProps> = ({
  name,
  role,
  department,
  avatarUrl,
  avatarAlt,
  socialLinks = {},
}) => (
  <div className="flex items-center gap-3">
    {avatarUrl ? (
      <img
        src={avatarUrl}
        alt={avatarAlt ?? name}
        className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0"
      />
    ) : (
      <AvatarFallback name={name} size="sm" />
    )}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-[#0a2342] truncate">{name}</p>
      <p className="text-xs font-medium text-[#c9a84c]">{role}</p>
      {department && (
        <p className="text-xs text-slate-400 truncate">{department}</p>
      )}
    </div>
    {Object.keys(socialLinks).length > 0 && (
      <div className="flex items-center gap-0.5 flex-shrink-0">
        {socialLinks.email && (
          <SocialButton href={`mailto:${socialLinks.email}`} icon={<MailIcon size={13} />} label="Email" />
        )}
        {socialLinks.website && (
          <SocialButton href={socialLinks.website} icon={<GlobeIcon size={13} />} label="Website" />
        )}
      </div>
    )}
  </div>
);

// ── Horizontal Layout ────────────────────────────────────────

const HorizontalLayout: React.FC<ProfileCardProps> = ({
  name,
  role,
  department,
  institution,
  bio,
  avatarUrl,
  avatarAlt,
  interests = [],
  socialLinks = {},
}) => (
  <div className="flex gap-5">
    <div className="flex-shrink-0">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={avatarAlt ?? name}
          className="w-20 h-20 rounded-xl object-cover ring-2 ring-[#0a2342]/10 shadow-sm"
        />
      ) : (
        <AvatarFallback name={name} size="md" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-[#0a2342]">{name}</h3>
          <p className="text-sm font-semibold text-[#c9a84c]">{role}</p>
          {department && (
            <p className="text-xs text-slate-500">{department}{institution ? ` · ${institution}` : ""}</p>
          )}
        </div>
        {Object.keys(socialLinks).length > 0 && (
          <div className="flex items-center gap-0.5 flex-shrink-0">
            {socialLinks.email && (
              <SocialButton href={`mailto:${socialLinks.email}`} icon={<MailIcon size={14} />} label="Email" />
            )}
            {socialLinks.website && (
              <SocialButton href={socialLinks.website} icon={<GlobeIcon size={14} />} label="Website" />
            )}
            {socialLinks.linkedin && (
              <SocialButton href={socialLinks.linkedin} icon={<LinkedInIcon size={14} />} label="LinkedIn" />
            )}
            {socialLinks.orcid && (
              <SocialButton href={socialLinks.orcid} icon={<OrcidIcon size={14} />} label="ORCID" />
            )}
          </div>
        )}
      </div>
      {bio && (
        <p className="text-sm text-slate-600 leading-relaxed mt-2 line-clamp-2">{bio}</p>
      )}
      {interests.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {interests.map((interest) => (
            <span
              key={interest}
              className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#0a2342]/8 text-[#0a2342] border border-[#0a2342]/15"
            >
              {interest}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ── Main Export ──────────────────────────────────────────────

export const ProfileCard: React.FC<ProfileCardProps> = ({
  variant = "default",
  className = "",
  onClick,
  ...props
}) => {
  const content = () => {
    switch (variant) {
      case "compact":    return <CompactLayout    variant={variant} {...props} />;
      case "horizontal": return <HorizontalLayout variant={variant} {...props} />;
      default:           return <DefaultLayout    variant={variant} {...props} />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={[
        "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden",
        variant === "default"    ? "p-6"   : "",
        variant === "compact"    ? "p-4"   : "",
        variant === "horizontal" ? "p-5"   : "",
        onClick
          ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {content()}
    </div>
  );
};

export default ProfileCard;
