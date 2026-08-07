const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// Public GET fetch
export async function fetchAPI(endpoint: string) {
  const res = await fetch(`${BACKEND_URL}${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

// Public POST fetch (for contact form, chat, etc.)
export async function postAPI(endpoint: string, data: any) {
  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // Extract error message properly
    let errorMessage = `Request failed with status ${res.status}`;
    
    try {
      const errorData = await res.json();
      // FastAPI returns errors in different formats
      errorMessage = 
        errorData.detail || 
        errorData.message || 
        errorData.error || 
        JSON.stringify(errorData);
    } catch {
      // If we can't parse JSON, use status text
      errorMessage = res.statusText || errorMessage;
    }
    
    // Always throw a proper Error object
    throw new Error(errorMessage);
  }

  return res.json();
}

// Admin fetch (requires auth token)
export async function adminFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BACKEND_URL}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    let errorMessage = `Admin request failed with status ${res.status}`;
    
    try {
      const errorData = await res.json();
      errorMessage = 
        errorData.detail || 
        errorData.message || 
        errorData.error || 
        JSON.stringify(errorData);
    } catch {
      errorMessage = res.statusText || errorMessage;
    }
    
    throw new Error(errorMessage);
  }

  return res.json();
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  }
}