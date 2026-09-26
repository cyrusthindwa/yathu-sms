const MenuIcon = ({ size = 20 }) => (
    <svg
        style={{
            transform: 'rotate(180deg)'
        }}
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3 5H17"
            stroke="#1a1a1a"
            strokeWidth="1.5"
            strokeLinecap="round"
        />

        <path
            d="M3 10H14"
            stroke="#1a1a1a"
            strokeWidth="1.5"
            strokeLinecap="round"
        />

        <path
            d="M3 15H17"
            stroke="#1a1a1a"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);

export default MenuIcon;