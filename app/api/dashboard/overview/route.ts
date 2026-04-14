// // app/api/dashboard/overview/route.ts
// import axios from "axios";

// export async function GET() {
//   try {
//     const res = await axios.get(
//       `${process.env.API_URL}/dashboard/overview`,
//       {
//         headers: {
//           "x-api-key": process.env.API_KEY!,
//         },
//       }
//     );

//     return Response.json(res.data);
//   } catch (error: any) {
//     return new Response(JSON.stringify(error.response?.data), {
//       status: error.response?.status || 500,
//     });
//   }
// }