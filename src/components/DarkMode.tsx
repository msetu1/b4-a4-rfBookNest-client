import React, { useState } from 'react';
import { Layout,Switch, ConfigProvider } from 'antd';

const { Header} = Layout;

const DarkMode = () => {
  // State to toggle between Light and Black Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);  // False for Light mode

  // Toggle Dark Mode
  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
  };

  const lightMode = {
    background: '#fff',
    text: '#000',
    header: '#fff',
    content: '#f0f2f5',
  };

  const blackDarkMode = {
    background: '#141414',
    text: '#fff',
    header: '#001529',
    content: '#141414',
  };

  // Determine the current theme
  const theme = isDarkMode ? blackDarkMode : lightMode;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: theme.background,
          colorTextBase: theme.text,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ padding: 0, background: theme.header }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Switch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              checkedChildren="Black Dark Mode"
              unCheckedChildren="Light Mode"
            />
          </div>
        </Header>
      </Layout>
    </ConfigProvider>
  );
};

export default DarkMode;
