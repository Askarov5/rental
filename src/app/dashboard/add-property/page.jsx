import PropertyAddForm from '@/components/PropertyAddForm'
import React from 'react'

const AddPropertyPage = () => {
  return (
    <section>
        <div className="border-b border-gray-200 pb-5 mb-5">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              List a Property
            </h3>
          </div>
        <PropertyAddForm />
    </section>
  )
}

export default AddPropertyPage