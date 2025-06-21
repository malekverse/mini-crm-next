"use client"

import { useState, useMemo, useCallback } from "react"

interface UsePaginationProps<T> {
  data: T[]
  itemsPerPage: number
}

interface PaginationResult<T> {
  currentItems: T[]
  totalPages: number
  totalItems: number
  currentPage: number
  itemsPerPage: number
  startIndex: number
  endIndex: number
  goToPage: (page: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  resetPage: () => void
}

export function usePagination<T>({ data, itemsPerPage }: UsePaginationProps<T>): PaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1)

  const paginationData = useMemo(() => {
    const totalItems = data.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    // Ensure current page is within bounds
    const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages || 1)

    const startIndex = (validCurrentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentItems = data.slice(startIndex, endIndex)

    return {
      currentItems,
      totalPages: totalPages || 1,
      totalItems,
      currentPage: validCurrentPage,
      itemsPerPage,
      startIndex: totalItems > 0 ? startIndex + 1 : 0,
      endIndex: Math.min(endIndex, totalItems),
    }
  }, [data, itemsPerPage, currentPage])

  const goToPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, paginationData.totalPages))
      setCurrentPage(validPage)
    },
    [paginationData.totalPages],
  )

  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1)
  }, [currentPage, goToPage])

  const goToPreviousPage = useCallback(() => {
    goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  const resetPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  return {
    ...paginationData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    resetPage,
  }
}
