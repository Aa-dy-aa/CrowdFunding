import React from 'react';

function Logo() {
  return (
    <svg width="52" height="62" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g id="growth">
        <circle fill="#dbe9fa" cx="16" cy="16" r="16" />
        <rect fill="#ffffff" height="14" width="6" x="2" y="16" />
        <rect fill="#d9dce1" height="19" width="6" x="9" y="11" />
        <rect fill="#ffffff" height="24" width="6" x="17" y="6" />
        <rect fill="#52acf9" height="28" width="6" x="24" y="2" />
        <path d="M2,30H8V16H2ZM4,18H6V28H4ZM9,30h6V11H9Zm2-17h2V28H11Zm6,17h6V6H17ZM19,8h2V28H19Zm5-6V30h6V2Zm4,26H26V4h2Z" />
      </g>
    </svg>
  );
}

export default Logo;
