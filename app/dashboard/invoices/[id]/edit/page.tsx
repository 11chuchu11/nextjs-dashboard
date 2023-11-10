import Form from '@/app/ui/invoices/edit-form'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data'
import { Invoice } from '@/app/lib/definitions'
import { notFound } from 'next/navigation'

interface props {
    params: {
        id: string
    }
}

export default async function Page({ params }: props) {

	const { id } = params
	const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()])
	
	if (!invoice) notFound()

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Invoices', href: '/dashboard/invoices' },
					{
						label: 'Edit Invoice',
						href: `/dashboard/invoices/${id}/edit`,
						active: true,
					},
				]}
			/>
			<Form invoice={invoice as Invoice} customers={customers} />
		</main>
	)
}
