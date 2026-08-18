"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
type PaginationProps = Omit<React.ComponentProps<"nav">, "onChange"> & {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, onPageChange, page, pageCount, ...props }, ref) => {
    if (pageCount < 2) return null;
    return (
      <nav
        ref={ref}
        data-slot="pagination"
        className={cn("pagination", className)}
        aria-label="Pagination"
        {...props}
      >
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="icon" /> Previous
        </Button>
        <span>
          Page {page} of {pageCount}
        </span>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Next <ChevronRight className="icon" />
        </Button>
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";
