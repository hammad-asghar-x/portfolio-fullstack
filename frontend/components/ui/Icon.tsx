export default function Icon({ id }: { id: string }) {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {id === 'mail' && <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>}
      {id === 'phone' && <path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />}
      {id === 'cal' && <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></>}
      {id === 'pin' && <><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>}
      {id === 'dl' && <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />}
      {id === 'send' && <path d="m22 2-7 20-4-9-9-4 20-7z" />}
      {id === 'star' && <path d="M12 2l3 7 7 .8-5.3 4.7L18.5 22 12 18l-6.5 4 1.8-7.5L2 9.8 9 9z" fill="currentColor" stroke="none" />}
      {id === 'left' && <path d="m14 6-6 6 6 6" />}
      {id === 'right' && <path d="m10 6 6 6-6 6" />}
      {id === 'x' && <path d="M6 6l12 12M18 6 6 18" />}
      {id === 'cap' && <path d="m2 9 10-5 10 5-10 5L2 9zm4 3v5c0 2 3 3 6 3s6-1 6-3v-5" />}
      {id === 'case' && <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></>}
      {id === 'code' && <path d="m8 8-4 4 4 4m8-8 4 4-4 4" />}
      {id === 'win' && <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></>}
      {id === 'ext' && <path d="M14 4h6v6M20 4 10 14M18 13v6H5V6h6" />}
    </svg>
  );
}