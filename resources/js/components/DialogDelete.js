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
const DialogDelete = ({ handleCloseModal, openModal, id, handleRefresh }) => {
    const [addLoading, setAddLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [successMessage, setSuccessMessage] = useState({});
    const api_token =
        document.getElementById("employee").dataset.entityid || null;

    const handleDelete = async () => {
        setAddLoading(true);
        setErrorMessage({});
        setSuccessMessage({});
        const deleteData = await fetch(
            "http://127.0.0.1:8000/api/employeeDelete?api_token=" + api_token,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id
                })
            }
        );
        const deleteData_json = await deleteData.json();
        if (deleteData_json?.success === true) {
            setSuccessMessage({
                message: "Success"
            });
            handleRefresh();
        } else {
            setErrorMessage({
                message: deleteData_json?.message
            });
        }
        setAddLoading(false);
    };
    return (
        <>
            <Dialog
                onClose={handleCloseModal}
                aria-labelledby="dgst"
                open={openModal}
            >
                <DialogTitle id="dgst">Delete Employee</DialogTitle>
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
                {addLoading && (
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                )}
                {!addLoading &&
                    !successMessage?.message &&
                    !errorMessage?.message && (
                        <>
                            <DialogContent>
                                Are you sure you want to delete the employee{" "}
                                {id}?
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleCloseModal}
                                    color="primary"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDelete}
                                    color="secondary"
                                >
                                    Yes
                                </Button>
                            </DialogActions>
                        </>
                    )}
            </Dialog>
        </>
    );
};
export default DialogDelete;
