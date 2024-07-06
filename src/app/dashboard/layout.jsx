import Sidebar from '@/components/Sidebar'
import React from 'react'

const DashboardLayout = ({children}) => {
  return (
    <div className="grid grid-cols-4 grid-flow-row min-h-[100vh]">
        <aside className="col-span-1">
            <Sidebar />
        </aside>
        <main className="col-span-3 p-10">
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout