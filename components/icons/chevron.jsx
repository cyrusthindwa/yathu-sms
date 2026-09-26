const ChevronIcon = ({ open }) => (
  <svg
    width="14" height="14" viewBox="0 0 14 14" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
  >
    <path d="M2.5 5l4.5 4 4.5-4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default ChevronIcon;