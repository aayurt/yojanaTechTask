import {
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";
import { AddPhotoAlternate } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
const DialogEdit = ({ handleCloseModal, openModal, id, handleRefresh }) => {
    const [loading, setLoading] = useState(false);
    const [gender, setGender] = useState("male");
    const [addLoading, setAddLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [successMessage, setSuccessMessage] = useState({});
    const [fetchData, setFetchData] = useState({});
    const [imageUploaded, setImageUploaded] = useState(null);
    const [mainState, setMainState] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileImage, setSelectedFileImage] = useState(null);
    const api_token =
        document.getElementById("employee").dataset.entityid || null;
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);

            const getData = await fetch(
                "http://127.0.0.1:8000/api/getEmployee?api_token=" + api_token,
                {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id })
                }
            );
            const getData_json = await getData.json();

            setFetchData(getData_json.data);

            setGender(getData_json?.data.gender);
            setLoading(false);
        };
        fetchApi();
    }, [openModal]);
    const handleEdit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", id);
        formData.append("image", selectedFileImage);
        formData.append("full_name", e.target?.full_name?.value);
        formData.append("date_of_birth", e.target?.date_of_birth?.value);
        formData.append("gender", e.target?.gender?.value);
        formData.append("salary", e.target?.salary?.value);
        formData.append("designation", e.target?.designation?.value);
        const data = {
            id,
            full_name: e.target?.full_name?.value,
            date_of_birth: e.target?.date_of_birth?.value,
            gender: e.target?.gender?.value,
            salary: parseInt(e.target?.salary?.value),
            designation: e.target?.designation?.value
        };
        if (
            !(
                data.full_name &&
                data.date_of_birth &&
                data.gender &&
                data.salary &&
                data.designation
            )
        ) {
        }
        setAddLoading(true);
        setErrorMessage({});
        setSuccessMessage({});
        const editData = await fetch(
            "http://127.0.0.1:8000/api/employeeEdit?api_token=" + api_token,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json"
                },
                body: formData
            }
        );
        const editData_json = await editData.json();
        if (editData_json?.success === true) {
            setSuccessMessage({
                message: "Success"
            });
            handleRefresh();
        } else {
            setErrorMessage(editData_json?.message?.errorInfo[2]);
        }
        setAddLoading(false);
    };
    const handleUploadClick = event => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function(e) {
            setSelectedFile(reader.result);
        };
        console.log("url", url); // Would see a path?
        setMainState("uploaded");
        setSelectedFileImage(event.target.files[0]);
        setImageUploaded(1);
    };
    if (!id) return null;
    return (
        <>
            <Dialog
                onClose={handleCloseModal}
                aria-labelledby="dgst"
                open={openModal}
            >
                <DialogTitle id="dgst">Edit Employee</DialogTitle>
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
                {(loading || addLoading) && (
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                )}

                {!loading &&
                    !addLoading &&
                    fetchData &&
                    !successMessage?.message &&
                    !errorMessage?.message && (
                        <form onSubmit={e => handleEdit(e)} novalidate>
                            <DialogContent>
                                {/* <DialogContentText>ADD EMPLOYEE</DialogContentText> */}
                                <input
                                    accept="image/*"
                                    id="contained-button-file"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={e => handleUploadClick(e)}
                                />
                                <label htmlFor="contained-button-file">
                                    <Fab component="span">
                                        <AddPhotoAlternate />
                                    </Fab>
                                </label>

                                {!selectedFile && fetchData?.image_url && (
                                    <div
                                        style={{
                                            padding: "1rem",
                                            display: "inline"
                                        }}
                                    >
                                        <img
                                            height="100px"
                                            alt="image"
                                            src={
                                                "http://127.0.0.1:8000" +
                                                fetchData?.image_url
                                            }
                                        />
                                    </div>
                                )}
                                {selectedFile && (
                                    <div
                                        style={{
                                            padding: "1rem",
                                            display: "inline"
                                        }}
                                    >
                                        <img
                                            height="100px"
                                            src={selectedFile}
                                            alt="image"
                                        />
                                    </div>
                                )}
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="full_name"
                                    defaultValue={fetchData?.full_name}
                                    label="Full Name"
                                    type="text"
                                    fullWidth
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="date_of_birth"
                                    defaultValue={fetchData?.date_of_birth}
                                    label="Date Of Birth"
                                    type="date"
                                    fullWidth
                                />
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Gender
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender"
                                        id="gender"
                                        defaultValue={fetchData?.gender}
                                        value={gender}
                                        onChange={e => {
                                            setGender(e?.target?.value);
                                        }}
                                    >
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio />}
                                            label="Female"
                                        />
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio />}
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            value="other"
                                            control={<Radio />}
                                            label="Other"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="salary"
                                    defaultValue={fetchData?.salary}
                                    label="Salary"
                                    type="number"
                                    fullWidth
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="designation"
                                    defaultValue={fetchData?.designation}
                                    label="Designation"
                                    type="text"
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleCloseModal}
                                    color="primary"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    color="primary"
                                    disabled={addLoading}
                                    variant="contained"
                                >
                                    Edit
                                </Button>
                            </DialogActions>
                        </form>
                    )}
            </Dialog>
        </>
    );
};
export default DialogEdit;
