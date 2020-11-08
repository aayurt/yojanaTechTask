import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import DialogAdd from "./DialogAdd";
import DialogEdit from "./DialogEdit";
import DialogDelete from "./DialogDelete";
import ExcelImport from "./ExcelImport";
import TableEmployee from "./TableEmployee";
import DialogExport from "./DialogExport";
import { Add, Print, Refresh } from "@material-ui/icons";
import { useReactToPrint } from "react-to-print";

const Employee = () => {
    const [loading, setloading] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [exportModal, setExportModal] = useState(false);
    const [deleteID, setDeleteID] = useState(null);
    const [selectedData, setSelectedData] = useState([]);

    const [fetchData, setFetchData] = useState([]);
    const [fetchDataOrginal, setFetchDataOrginal] = useState([]);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    useEffect(() => {
        const fetchApi = async () => {
            const api_token =
                document.getElementById("employee").dataset.entityid || null;
            const getData = await fetch(
                "http://127.0.0.1:8000/api/getEmployee?api_token=" + api_token,
                {
                    headers: {
                        credentials: "same-origin",
                        Accept: "application/json"
                    }
                }
            );
            const getData_json = await getData.json();
            setFetchData(getData_json.employees);
            setFetchDataOrginal(getData_json.employees);
            setloading(false);
        };
        setloading(true);
        fetchApi();
    }, [refresh]);
    const handleRefresh = () => {
        setRefresh(!refresh);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleCloseModalEdit = () => {
        setOpenModalEdit(false);
    };
    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
    };
    const handleExportModal = () => {
        setExportModal(false);
    };
    const handleExportModalOpen = () => {
        setExportModal(true);
    };
    const handleChange = e => {
        const searchData = fetchDataOrginal.filter(ele => {
            if (
                ele.full_name
                    .toLowerCase()
                    .includes(e.target?.value.toLowerCase()) ||
                ele.date_of_birth
                    .toLowerCase()
                    .includes(e.target?.value.toLowerCase()) ||
                ele.designation
                    .toLowerCase()
                    .includes(e.target?.value.toLowerCase()) ||
                ele.gender
                    .toLowerCase()
                    .includes(e.target?.value.toLowerCase()) ||
                ele.salary.toLowerCase().includes(e.target?.value.toLowerCase())
            ) {
                return true;
            }
        });
        setFetchData(searchData);
    };
    return (
        <>
            {openModal && (
                <DialogAdd
                    handleCloseModal={handleCloseModal}
                    openModal={openModal}
                    handleRefresh={handleRefresh}
                />
            )}
            {openModalEdit && (
                <DialogEdit
                    handleCloseModal={handleCloseModalEdit}
                    openModal={openModalEdit}
                    handleRefresh={handleRefresh}
                    id={deleteID}
                />
            )}
            {openModalDelete && (
                <DialogDelete
                    handleCloseModal={handleCloseModalDelete}
                    openModal={openModalDelete}
                    handleRefresh={handleRefresh}
                    id={deleteID}
                />
            )}
            {exportModal && (
                <DialogExport
                    handleCloseModal={handleExportModal}
                    openModal={exportModal}
                    id={deleteID}
                    selectedData={selectedData}
                />
            )}
            <ExcelImport handleRefresh={handleRefresh} />
            <br />
            <Grid container spacing={1} style={{ flexGrow: 1 }}>
                <Grid
                    lg={12}
                    item
                    key={1}
                    style={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handlePrint}
                    >
                        PRINT <Print />
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={1} style={{ flexGrow: 1 }}>
                <Grid lg={8} item key={1}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setRefresh(!refresh);
                        }}
                    >
                        REFRESH
                        <Refresh />
                    </Button>
                </Grid>
                <Grid
                    lg={4}
                    key={2}
                    item
                    style={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setOpenModal(true);
                        }}
                    >
                        ADD RECORD <Add />
                    </Button>
                </Grid>
            </Grid>
            {loading && (
                <Grid container>
                    <Grid
                        lg={12}
                        key={1}
                        item
                        style={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <CircularProgress />
                    </Grid>
                </Grid>
            )}
            <div ref={componentRef}>
                <TextField
                    id="search"
                    label="Search"
                    onChange={e => handleChange(e)}
                    variant="outlined"
                    style={{ marginTop: "1rem" }}
                />
                <TableEmployee
                    data={fetchData}
                    setOpenModal={setOpenModalEdit}
                    setOpenModalDelete={setOpenModalDelete}
                    setDeleteID={setDeleteID}
                    setSelectedData={setSelectedData}
                    handleExportModalOpen={handleExportModalOpen}
                />
            </div>
            <br />
        </>
    );
};
export default Employee;
if (document.getElementById("employee")) {
    ReactDOM.render(<Employee />, document.getElementById("employee"));
}
