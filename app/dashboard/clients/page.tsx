"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/hooks/usePagination"
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"
import clientsData from "@/data/clients.json"
import type { Client } from "@/types/client"
import { formatDate } from "@/utils/formatters"

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<"name" | "email" | "createdAt">("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [itemsPerPage, setItemsPerPage] = useState(5) // Start with 5 to better show pagination

  // Filter and sort clients
  const filteredAndSortedClients = useMemo(() => {
    const filtered = [...clientsData].filter(
      (client: Client) =>
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    filtered.sort((a: Client, b: Client) => {
      let aValue: string
      let bValue: string

      switch (sortField) {
        case "name":
          aValue = `${a.firstName} ${a.lastName}`
          bValue = `${b.firstName} ${b.lastName}`
          break
        case "email":
          aValue = a.email
          bValue = b.email
          break
        case "createdAt":
          aValue = a.createdAt
          bValue = b.createdAt
          break
        default:
          aValue = `${a.firstName} ${a.lastName}`
          bValue = `${b.firstName} ${b.lastName}`
      }

      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })

    return filtered
  }, [searchTerm, sortField, sortDirection])

  const {
    currentItems: paginatedClients,
    totalPages,
    currentPage,
    totalItems,
    startIndex,
    endIndex,
    goToPage,
    resetPage,
  } = usePagination({
    data: filteredAndSortedClients,
    itemsPerPage,
  })

  useEffect(() => {
    resetPage()
  }, [searchTerm, itemsPerPage, resetPage])

  const handleSort = (field: "name" | "email" | "createdAt") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-2">Manage your client relationships</p>
          </div>
          <Link href="/dashboard/add-client">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Add New Client
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search clients by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 per page</SelectItem>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="20">20 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            {totalItems > 0 ? (
              <>
                Showing {startIndex} to {endIndex} of {totalItems} clients
                {searchTerm && <span className="ml-2">(filtered from {clientsData.length} total)</span>}
              </>
            ) : (
              "No clients found"
            )}
          </div>
          {totalPages > 1 && (
            <div>
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Clients</CardTitle>
          </CardHeader>
          <CardContent>
            {paginatedClients.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-2">
                  {searchTerm ? "No clients found matching your search" : "No clients found"}
                </div>
                {searchTerm && (
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4">
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("name")}
                            className="font-semibold text-gray-900 hover:text-blue-600 p-0 h-auto"
                          >
                            Name
                            <ChevronUpDownIcon className="ml-1 h-4 w-4" />
                            {sortField === "name" && (
                              <span className="ml-1 text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                          </Button>
                        </th>
                        <th className="text-left py-3 px-4">
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("email")}
                            className="font-semibold text-gray-900 hover:text-blue-600 p-0 h-auto"
                          >
                            Email
                            <ChevronUpDownIcon className="ml-1 h-4 w-4" />
                            {sortField === "email" && (
                              <span className="ml-1 text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                          </Button>
                        </th>
                        <th className="text-left py-3 px-4">Phone</th>
                        <th className="text-left py-3 px-4">Tags</th>
                        <th className="text-left py-3 px-4">
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("createdAt")}
                            className="font-semibold text-gray-900 hover:text-blue-600 p-0 h-auto"
                          >
                            Created
                            <ChevronUpDownIcon className="ml-1 h-4 w-4" />
                            {sortField === "createdAt" && (
                              <span className="ml-1 text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedClients.map((client: Client, index) => (
                        <tr
                          key={client.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <td className="py-4 px-4">
                            <Link
                              href={`/dashboard/clients/${client.id}`}
                              className="block hover:text-blue-600 transition-colors duration-150"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                  {client.firstName[0]}
                                  {client.lastName[0]}
                                </div>
                                <div className="font-medium">
                                  {client.firstName} {client.lastName}
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            <Link
                              href={`/dashboard/clients/${client.id}`}
                              className="block hover:text-blue-600 transition-colors duration-150"
                            >
                              {client.email}
                            </Link>
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            <Link
                              href={`/dashboard/clients/${client.id}`}
                              className="block hover:text-blue-600 transition-colors duration-150"
                            >
                              {client.phone}
                            </Link>
                          </td>
                          <td className="py-4 px-4">
                            <Link href={`/dashboard/clients/${client.id}`} className="block">
                              <div className="flex flex-wrap gap-1">
                                {client.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </Link>
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            <Link
                              href={`/dashboard/clients/${client.id}`}
                              className="block hover:text-blue-600 transition-colors duration-150"
                            >
                              {formatDate(client.createdAt)}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex} to {endIndex} of {totalItems} results
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={goToPage}
                      className="flex-shrink-0 flex flex-wrap"
                    />
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  )
}
