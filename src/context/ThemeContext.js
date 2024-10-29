import { createContext, useState, useContext } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const themeStyles = theme === "light"
    ? {
        backgroundColor: "#ffffff",
        color: "#117d87",
        buttonBackground: "#117d87",
        buttonColor: "#ffffff",
        borderColor: "#dddddd",
        linkColor: "#117d87",
        inputBackground: "#f0f0f0",
        inputColor: "#000000",
        cardBackground: "#ffffff",
      }
    : {
        backgroundColor: "#000000",
        color: "#95b0b4",
        buttonBackground: "#117d87",
        buttonColor: "#000000",
        borderColor: "#444444",
        linkColor: "#95b0b4",
        inputBackground: "#333333",
        inputColor: "#ffffff",
        cardBackground: "#1e1e1e",
      };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
}



// export const DataProvider = ({ children }) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true); 

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('https://api.example.com/data'); // Fetch data
//                 setData(response.data); // Update state with fetched data
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             } finally {
//                 setLoading(false); // Set loading to false
//             }
//         };

//         fetchData(); // Call the fetch function
//     }, []); // Runs once when the provider mounts

//     return (
//         <DataContext.Provider value={{ data, loading }}>
//             {children} 
//         </DataContext.Provider>
//     );
// };


// import React, { useContext } from 'react';
// import { DataContext } from './DataProvider'; // Import the context

// const DataDisplay = () => {
//     const { data, loading } = useContext(DataContext); // Access context data

//     if (loading) return <p>Loading...</p>; // Show loading state

//     return (
//         <div>
//             <h1>Data:</h1>
//             <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display fetched data */}
//         </div>
//     );
// };