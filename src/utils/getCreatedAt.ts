const getCreatedAt = (createdAt: string): string => {
  const timeAgo = new Date(createdAt).getTime();
  const now = Date.now();
  const diffInMilliseconds = now - timeAgo;

  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }
  if (diffInDays < 30) {
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  }
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  return `${diffInYears} years ago`;
};

export default getCreatedAt;
