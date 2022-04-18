// Import all needed dependencies
import React from 'react'
import { useParams } from 'react-router-dom';

// Import api from invoice
import { getInvoiceByOrderId } from '../../app/api/invoice';

// Import utility format rupiah
import { formatRupiah } from '../../app/utils';

// Import all needed components
import Navbar from '../../components/Navbar/Navbar';
import InvoiceData from '../../components/Invoices/InvoiceData';

const Invoices = () => {
  // order_id as parameter
  const { order_id } = useParams();

  // State
  const [invoice, setInvoice] = React.useState({});
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("process");

  // Each order item change, fetch API of getInvoiceByOrderId
  React.useEffect(() => {
    getInvoiceByOrderId(order_id)
      .then(({ data }) => {
        if (data.error) {
          setError(data.message);
        }
        setInvoice(data);
      })
      .catch((err) => setError(err.message))
      .finally((_) => setStatus("success"));
  }, [order_id]);

  return (
    <div>
        <Navbar />
        <div className="container pl-[7.5rem] xs:pt-48 lg:pt-20">
          {status === "process" && (
            <p>Loading...</p>
          )}
          {/* If fetching status is success and no error, invoice component will be rendered  */}
          { (status === "success" && error === "") && (
            <InvoiceData
              status={invoice?.payment_status} 
              orderId={invoice?.order?.order_number} 
              total={formatRupiah(invoice?.total)} 
              userName={invoice?.user?.full_name} 
              email={invoice?.user?.email} 
              addressDetail={invoice?.delivery_address?.detail} 
              kelurahan={invoice?.delivery_address?.kelurahan} 
              kecamatan={invoice?.delivery_address?.kecamatan} 
              kabupaten={invoice?.delivery_address?.kabupaten} 
              provinsi={invoice?.delivery_address?.provinsi} />
          )}
        </div>
    </div>
  )
}

// export to app.js
export default Invoices