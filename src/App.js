import React from 'react';
import './App.css';
import Layout from "./components/Layout"
import FileUpload from './pages/Upload';

function App() {
  return (
    <Layout>
      <FileUpload />
    </Layout>
  );
}

export default App;