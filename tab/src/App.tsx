import React, { useState } from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

type CurrentTabs = {
  title: string;
  category: string;
};

// type _SetCurrentTabs = (object: CurrentTabs) => void;

type NavProps = {
  _SetCurrentTabs: (object: CurrentTabs) => void;
};

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [currentTabs, setCurrentTabs] = useState([
    {
      title: 'Title 1',
      category: 'client',
    },
    {
      title: 'Title 2',
      category: 'client',
    },
    {
      title: 'Title 3',
      category: 'dashboard',
    },
  ]);

  const _setCurrentTabs = (object: CurrentTabs): void => {
    const isExist = currentTabs.findIndex((cur) => cur.title === object.title);

    if (isExist === -1) {
      setCurrentTabs([...currentTabs, object]);
      setTabIndex(currentTabs.length);
    } else {
      setTabIndex(isExist);
    }
  };

  const removeTab = (title: string) => {
    setCurrentTabs(currentTabs.filter((c) => c.title !== title));
  };

  const navProps = {
    _SetCurrentTabs: _setCurrentTabs,
  };

  return (
    <div className="container">
      <Nav {...navProps} />
      <Tabs
        forceRenderTabPanel={true}
        onSelect={(index, event) => {}}
        selectedIndex={tabIndex}
        className="tabs"
      >
        <TabList>
          {currentTabs.map((c) => (
            <div key={c.title} className="tab_div">
              <Tab
                className="tab"
                onClick={(e: any) => {
                  setTabIndex(
                    // set current index
                    currentTabs.findIndex(
                      (c) => c.title === e.target.textContent
                    )
                  );
                }}
              >
                {c.title}
              </Tab>
              <div
                className="close_button"
                onClick={(e) => {
                  // close tab
                  removeTab(c.title);
                }}
              >
                X
              </div>
            </div>
          ))}
        </TabList>

        {currentTabs.map((c) => (
          <TabPanel
            key={c.title}
            className={
              tabIndex === currentTabs.findIndex((cur) => cur.title === c.title)
                ? 'focus_tab'
                : 'unfocus_tab'
            }
          >
            {c.category === 'client' ? <Client title={c.title} /> : <></>}
            {c.category === 'dashboard' ? <Dashboard title={c.title} /> : <></>}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}

const Client = (props: { title: string }) => {
  const { title } = props;

  return (
    <div>
      <p>{title}</p>
      <p>Client component</p>
      <input type="text" />
    </div>
  );
};

const Dashboard = (props: { title: string }) => {
  const { title } = props;
  return (
    <div>
      <p>{title}</p>
      <p>Dashboard component</p>
      <input type="text" />
    </div>
  );
};

const Nav = (props: NavProps) => {
  const { _SetCurrentTabs } = props;

  const clientList = [
    {
      id: 0,
      name: '상우정밀',
      category: 'client',
    },
    {
      id: 1,
      name: '뭐더라회사',
      category: 'client',
    },
  ];

  return (
    <div className="navigation">
      {clientList.map((c) => (
        <p
          className="client"
          key={c.id}
          onClick={() =>
            _SetCurrentTabs({ title: c.name, category: c.category })
          }
        >
          {c.name}
        </p>
      ))}
    </div>
  );
};

export default App;
