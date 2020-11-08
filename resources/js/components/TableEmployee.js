import {
    Button,
    Checkbox,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { lighten, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
let rows;
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}
const handleDelete = selected => {
    console.log("DDDDDDDDDDDDDD", selected);
};
const headCells = [
    {
        id: "full_name",
        numeric: false,
        disablePadding: true,
        label: "Full Name"
    },
    {
        id: "date_of_birth",
        numeric: true,
        disablePadding: false,
        label: "Date of Birth"
    },
    { id: "gender", numeric: true, disablePadding: false, label: "Gender" },
    { id: "salary", numeric: true, disablePadding: false, label: "Salary" },
    {
        id: "designation",
        numeric: true,
        disablePadding: false,
        label: "Designation"
    },
    {
        id: "imported_date",
        numeric: false,
        disablePadding: false,
        label: "Imported Date"
    },
    {
        id: "action",
        numeric: false,
        disablePadding: false,
        label: "Actions"
    }
];

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort
    } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight:
        theme.palette.type === "light"
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85)
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark
              },
    title: {
        flex: "1 1 100%"
    }
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const {
        numSelected,
        selected,
        handleExportModalOpen,
        setSelectedData
    } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    EMPLOYEE
                </Typography>
            )}

            {numSelected > 0 ? (
                <>
                    <Tooltip title="export">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                handleExportModalOpen();
                                setSelectedData(selected);
                            }}
                        >
                            Export Selected
                        </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            aria-label="delete"
                            onClick={handleDelete(selected)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
}));

export default function TableEmployee({
    data,
    setOpenModal,
    setOpenModalDelete,
    setDeleteID,
    handleExportModalOpen,
    setSelectedData
}) {
    const classes = useStyles();
    rows = data;
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    if (rows === null) return null;
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    selected={selected}
                    handleExportModalOpen={handleExportModalOpen}
                    setSelectedData={setSelectedData}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow tabIndex={-1} key={row.id}>
                                            <TableCell
                                                padding="checkbox"
                                                selected={isItemSelected}
                                                onClick={event =>
                                                    handleClick(event, row.id)
                                                }
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                            >
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.full_name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.date_of_birth}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.gender}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.salary}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.designation}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.imported_date}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    component="span"
                                                    onClick={() => {
                                                        setDeleteID(row.id);

                                                        setOpenModal(true);
                                                    }}
                                                >
                                                    EDIT
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    component="span"
                                                    onClick={() => {
                                                        setDeleteID(row.id);
                                                        setOpenModalDelete(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    DELETE
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
            />
        </div>
    );
}
