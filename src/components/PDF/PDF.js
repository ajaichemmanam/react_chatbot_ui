import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PDF = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
// console.log(props.pdfUrl)
  return (
    <div className="bubble" key={props.questionIndex}>
      <Document file={props.pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={300} />
      </Document>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber(pageNumber - 1);
            }
          }}
        >
          Prev
        </button>

        <p style={{ margin: "0px 15px 0px 15px" }}>
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={() => {
            if (pageNumber < numPages) {
              setPageNumber(pageNumber + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
