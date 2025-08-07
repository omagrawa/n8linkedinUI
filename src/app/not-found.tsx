"use client";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl font-semibold">Loading...</div></div>}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
      </div>
    </Suspense>
  );
} 