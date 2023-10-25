"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


const queryClient = new QueryClient()
export function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>  
      <NextThemesProvider 
        attribute="class"
        enableSystem={true}
        defaultTheme="system"
        {...props}
      >
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
      )
}
