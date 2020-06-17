import React from 'react';
import { Tab, Image } from 'semantic-ui-react';
import EthNftMaker from './EthNftMaker';
import './index.scss';

const panes = [
  {
    menuItem: {
      key: 'ethereum',
      icon: <Image src='' />,
      content: 'Ethereum'
    },
    render: () => <Tab.Pane>
      <EthNftMaker />
    </Tab.Pane>
  },
  {
    menuItem: {
      key: 'eos',
      icon: <Image src='' />,
      content: 'EOS'
    },
    render: () => <Tab.Pane>

    </Tab.Pane>
  },
  {
    menuItem: {
      key: 'tron',
      icon: <Image src='' />,
      content: 'Tron'
    },
    render: () => <Tab.Pane>
    </Tab.Pane>
  },
]

export default class NftMaker extends React.Component {
  render() {
    return (
      <div>
        <Tab
          className="editor"
          menu={{ attached: false, secondary: true }}
          panes={panes}
          defaultActiveIndex={0}
        />
      </div >
    )
  }
}