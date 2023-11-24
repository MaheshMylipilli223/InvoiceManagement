import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import InvoiceForm from './InvoiceForm';
import { useNavigate } from 'react-router-dom';
import { useInvoiceListData } from '../redux/hooks';

function BulkUpdate() {
  const navigate = useNavigate();
  const [multiInvoices, setMultiInvoices] = useState([]);
  const reduxMultiInvoices = useSelector((state) => state.bulkInvoices.multiInvoices);
  const [currentId, setCurrentId] = useState(null);
  const [updatedData, setUpdatedData] = useState([])
  const { getOneInvoice } = useInvoiceListData();

  useEffect(() => {

    setMultiInvoices(reduxMultiInvoices);
    if (reduxMultiInvoices.length > 0 && currentId === null) {
      setCurrentId(reduxMultiInvoices[0]);
    }
  }, [reduxMultiInvoices, currentId]);

  if (multiInvoices.length === 0) {
    navigate('/');
  }

  useEffect(() => {
    multiInvoices?.forEach((id) => {
        updatedData.push(getOneInvoice(id))
        setUpdatedData([...new Set(updatedData)])
    })
    // eslint-disable-next-line
  }, [multiInvoices])


  return (
    <>
      <Container style={{ backgroundColor: "rgba(0,0,0,0.1735)", position: "sticky", top: 0, width: "100%", zIndex: 1000, padding: "1em", borderRadius: ".5em" }}>
        {multiInvoices.map((invoice) => (
            <button
            className='btn btn-warning'
            style={{ margin: "6px" }}
            key={invoice}
            onClick={() => setCurrentId(invoice)}
            >
            Invoice ID: {invoice}
            </button>
        ))}
    </Container>
    <br />
      <Container>
        {currentId !== null && (
          <>
            <h1>You're editing Invoice ID: {currentId}</h1>
            <hr />
            <InvoiceForm id={currentId} isBulk={true} updatedData={updatedData} setUpdatedData={setUpdatedData} />
          </>
        )}
      </Container>
    </>
  );
}

export default BulkUpdate;
