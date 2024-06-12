import { useEffect, useState } from "react";
import { Container, Text, VStack, Spinner, Box } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=d1")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.data.map((entry) => ({
          date: new Date(entry.time).toLocaleDateString(),
          price: parseFloat(entry.priceUsd),
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Cryptocurrency Price Graph</Text>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Box width="100%" height="400px">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;