"use client";
import { useEffect, useState } from 'react';
const [theme, setTheme] = useState('dark');

useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);

const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
};

export default toggleTheme;