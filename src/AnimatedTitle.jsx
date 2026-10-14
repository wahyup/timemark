import React from 'react';

export default function AnimatedTitle({ text, className = '' }) {
  return <p className={`animated-title ${className}`}>{text}</p>;
}
