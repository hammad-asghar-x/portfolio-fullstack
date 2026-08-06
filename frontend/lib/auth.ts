export function checkAuth() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    return !!token;
  }
  return false;
}

export function requireAuth() {
  if (typeof window !== 'undefined') {
    if (!checkAuth()) {
      window.location.href = '/admin/login';
      return false;
    }
    return true;
  }
  return false;
}

export function redirectIfAuth() {
  if (typeof window !== 'undefined') {
    if (checkAuth()) {
      window.location.href = '/admin/dashboard';
      return true;
    }
    return false;
  }
  return false;
}