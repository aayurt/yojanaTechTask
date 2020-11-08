// import { Table } from "antd";
// import React, { useReducer } from "react";
// const TableEmployee = ({ columns, data }) => {
//     const pagination = { position: "bottom" };
//     const initialState = {
//         bordered: false,
//         loading: false,
//         pagination: true,
//         size: "default",
//         expandable: false,
//         title: undefined,
//         showHeader: true,
//         footer: false,
//         rowSelection: {},
//         scroll: undefined,
//         hasData: true,
//         tableLayout: undefined,
//         top: "none",
//         bottom: "bottomRight"
//     };
//     const merge = (oldState, newState) => ({ ...oldState, ...newState });
//     const [state, setState] = useReducer(merge, initialState);
//     const { xScroll, yScroll } = state;

//     const scroll = {};
//     if (yScroll) {
//         scroll.y = 240;
//     }
//     if (xScroll) {
//         scroll.x = "100vw";
//     }

//     const tableColumns = columns.map(item => ({
//         ...item,
//         ellipsis: state.ellipsis
//     }));
//     if (xScroll === "fixed") {
//         tableColumns[0].fixed = true;
//         tableColumns[tableColumns.length - 1].fixed = "right";
//     }
//     return (
//         <>
//             <Table
//                 rowSelection={state.rowSelection}
//                 pagination={{ position: [state.top, state.bottom] }}
//                 columns={tableColumns}
//                 dataSource={state.hasData ? data : null}
//                 scroll={scroll}
//             />
//         </>
//     );
// };
// export default TableEmployee;
