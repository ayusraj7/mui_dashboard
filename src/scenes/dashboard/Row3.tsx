import React from 'react'
import DashboardBox from '../../components/DashboardBox.tsx'
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "../../state/api.ts";
import { DataGrid, GridCellParams, renderActionsCell } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import BoxHeader from "../../components/BoxHeader.tsx";
import { useTheme } from "@emotion/react";
import FlexBetween from "../../components/FlexBetween.tsx";
import { Pie, PieChart, Cell } from "recharts";
import { useMemo } from "react";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderActionsCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.5,
      valueGetter: (value: any) => `$${value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      valueGetter: (value: any, row: any) => value?.length,
    },
  ];

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0]?.totalExpenses;
      return Object.entries(kpiData[0]?.expensesByCategory)
        ?.slice(0, 3)
        ?.map(([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        });
    }
  }, [kpiData]);

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              background: "#2d2d34 !important",
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid #fffff26 !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              background: "#2d2d34 !important",
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={30}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              background: "#2d2d34 !important",
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid #fffff26 !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              background: "#2d2d34 !important",
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={30}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem" textAlign="center">
          {pieChartData?.map((data: any, i: number) => (
            <Box key={`${data[0].name}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={38}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader title="Overall Summary" sideText="+15%" />
        <Box
          height={"15px"}
          margin={"1.25rem 1rem 0.4rem 1rem"}
          bgcolor={palette.primary[600]}
          borderRadius={"1rem"}
        >
          <Box
            height={"15px"}
            bgcolor={palette.primary[800]}
            borderRadius={"1rem"}
            width={"40%"}
          ></Box>
          <Typography margin={" 10px 1rem"} variant="h6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas
            incidunt minus molestias dolor eum, eaque perferendis. Suscipit
            asperiores, inventore, exercitationem nisi eum sed iusto molestiae
            vel modi assumenda, eveniet dolor neque deleniti rerum minima vitae
            temporibus itaque soluta. Distinctio fugiat dignissimos soluta hic
            eaque quaerat minus recusandae omnis qui ipsa!
          </Typography>
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row3