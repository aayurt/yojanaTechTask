import {
    Avatar,
    Badge,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import { Close, Mail, Person } from "@material-ui/icons";
import React, { useState } from "react";
const ExcelImport = ({ handleRefresh }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imported, setImported] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [importedMsg, setImportedMsg] = useState([]);
    const errorList = [];
    let pointer = null;
    const handleClose = () => {
        setOpenDialog(false);
    };
    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append("your_file", selectedFile);

        setLoading(true);
        setImported(false);
        const api_token =
            document.getElementById("employee").dataset.entityid || null;
        const postExcel = await fetch(
            "http://127.0.0.1:8000/api/employee?api_token=" + api_token,
            {
                method: "POST",
                body: formData,
                headers: {
                    AUTH_KEY: "ABCD"
                }
            }
        );
        const postExcelJson = await postExcel.json();
        setLoading(false);
        setImported(true);
        setImportedMsg(postExcelJson);
        handleRefresh();
    };
    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };
    return (
        <>
            <div style={{ marginTop: "1rem" }}>
                <span
                    style={{ padding: "10px", color: "green", fontWeight: 600 }}
                >
                    IMPORT
                </span>
                <input
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    id="excel"
                    type="file"
                    onChange={onFileChange}
                />
                {selectedFile && (
                    <label>
                        <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            onClick={onFileUpload}
                        >
                            Upload
                        </Button>
                    </label>
                )}
            </div>

            {loading && <CircularProgress />}
            {imported && importedMsg && (
                <>
                    <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Badge
                            badgeContent={
                                importedMsg?.response?.length
                                    ? importedMsg?.response?.length
                                    : 0
                            }
                            color="error"
                            onClick={() => {
                                setOpenDialog(true);
                            }}
                        >
                            <Mail />
                        </Badge>
                    </div>
                    <Dialog
                        onClose={handleClose}
                        aria-labelledby="simple-dialog-title"
                        open={openDialog}
                    >
                        <DialogTitle id="simple-dialog-title">
                            ERRORS AND FAILURES
                        </DialogTitle>
                        {}
                        <List>
                            {importedMsg?.response?.map((ele, i) => {
                                if (
                                    ele?.values?.full_name === null ||
                                    ele?.values?.date_of_birth === null ||
                                    ele?.values?.gender === null ||
                                    ele?.values?.salary === null ||
                                    ele?.values?.designation === null
                                ) {
                                    if (ele?.row === pointer) return <></>;
                                    pointer = ele?.row;
                                    errorList.push(ele?.row);
                                    return <></>;
                                }
                                return (
                                    <>
                                        <ListItem key={i}>
                                            <Close />

                                            <ListItemText
                                                primary={`
                                        In Row ${ele?.row}, ${ele?.fail_errors}
                                            `}
                                            />
                                        </ListItem>
                                    </>
                                );
                            })}
                            {errorList?.length > 0 && (
                                <>
                                    <ListItem>
                                        <Close color="red" />

                                        <ListItemText
                                            style={{ color: "red" }}
                                            primary={`
                                        Row [${errorList.toString()}] was skipped since there were no data.
                                            `}
                                        />
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </Dialog>
                </>
            )}
        </>
    );
};
export default ExcelImport;
