import React from 'react'
// import { PriceBarChart } from '../cmps/admin/charts/InventoryByLabelChart'
import { InvByLabel } from '../cmps/admin/charts/InvByLabel'
import { PricesPerLabel } from '../cmps/admin/charts/PricesPerLabel'
import { RandomNumbers } from '../cmps/admin/charts/RandomNumbers'

export function AdminDash() {
  return (
    <section className='admin-dashboard flex space-between wrap'>
    <InvByLabel />
    <PricesPerLabel />
    <RandomNumbers />
    {/* <PricesPerLabelChart /> */}
    </section>
  )
}
