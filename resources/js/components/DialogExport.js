import {
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import React, { useState } from "react";
const DialogExport = ({ handleCloseModal, openModal, id, selectedData }) => {
    const [exportLoading, setExportLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [successMessage, setSuccessMessage] = useState({});

    const handleExport = async pdfFormat => {
        setExportLoading(true);
        setErrorMessage({});
        setSuccessMessage({});
        console.log("selectedData", selectedData);
        const deleteData = await fetch(
            "http://127.0.0.1:8000/api/exportEmployeesSome",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    getList: selectedData,
                    pdfFormat: pdfFormat
                })
            }
        );
        const deleteData_json = await deleteData.blob();
        const href = window.URL.createObjectURL(deleteData_json);
        window.open(href);
        // if (deleteData_json?.success === true) {
        //     setSuccessMessage({
        //         message: "Success"
        //     });
        // } else {
        //     setErrorMessage({
        //         message: deleteData_json?.message
        //     });
        // }
        setExportLoading(false);
    };
    return (
        <>
            <Dialog
                onClose={handleCloseModal}
                aria-labelledby="dgst"
                open={openModal}
            >
                <DialogTitle id="dgst">Export Selected Employee</DialogTitle>
                {errorMessage?.message && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "1rem"
                        }}
                    >
                        <Chip label={errorMessage?.message} color="secondary" />
                    </div>
                )}
                {successMessage?.message && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "1rem"
                        }}
                    >
                        <Chip label={successMessage?.message} color="success" />
                    </div>
                )}
                {exportLoading && (
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                )}
                {!exportLoading &&
                    !successMessage?.message &&
                    !errorMessage?.message && (
                        <>
                            <DialogContent>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleExport("pdf")}
                                        style={{ margin: "10px" }}
                                    >
                                        PDF
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleExport("xlsx")}
                                        style={{ margin: "10px" }}

                                        // onClick={handleExport(selected)}
                                    >
                                        EXCEL
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleExport("csv")}
                                        style={{ margin: "10px" }}

                                        // onClick={handleExport(selected)}
                                    >
                                        CSV
                                    </Button>
                                </div>
                            </DialogContent>
                        </>
                    )}
            </Dialog>
        </>
    );
};
export default DialogExport;
