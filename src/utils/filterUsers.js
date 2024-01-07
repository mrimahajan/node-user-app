export const getFilterUserObj = (qs) => {
  const filters = {};
  if (qs.first_name?.trim()) {
    filters.first_name = { $regex: qs.first_name.trim(), $options: 'i' };
  }
  if (qs.last_name?.trim()) {
    filters.last_name = { $regex: qs.last_name.trim(), $options: 'i' };
  }
  if (qs.email?.trim()) {
    filters.email = { $regex: qs.email.trim(), $options: 'i' };
  }
  if (qs.age?.trim()) {
    filters.age = { $gte: qs.age.trim() };
  }
  return filters;
};
