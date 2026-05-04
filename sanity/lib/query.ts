

/*export const EXECUTIVE_QUERY = `
*[_type == "executive"] | order(
  select(
    role == "president"      => 1,
    role == "vice-president" => 2,
    role == "secretary"      => 3,
    role == "treasurer"      => 4,
    99
  ) asc
) {
  name,
  role,
  profileImage,
  bio,
  division,
  socialLinks[] {
    platform,
    url
  }
}
`; */