import React from 'react';
import Picker from '../picker';
import Popup from '../popup';
import { provins, citys, areas } from './address';
import './index.scss';

const propTypes = {
  defaultValue: React.PropTypes.array.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  visible: React.PropTypes.bool.isRequired,
}

class PickerAddress extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.address = [];
    // 初始化数据
    this.initDefaultData();
  }

  initDefaultData () {
    this.data = {
      provins: {
        list: provins,
        defaultValue: this.props.defaultValue[0],
        displayValue (name) {
          return name;
        }
      },
      citys: {
        list: citys[this.props.defaultValue[0]],
        defaultValue: this.props.defaultValue[1],
        displayValue (name) {
          return name;
        }
      },
      areas: {
        list: areas[this.props.defaultValue[1]],
        defaultValue: this.props.defaultValue[2],
        displayValue (name) {
          return name;
        }
      }
    }
  }

  handleChangeProvin (provin) {
    this.data.provins = {
      list: provins,
      defaultValue: provin,
    };
    this.data.citys = {
      list: citys[provin],
      defaultValue: citys[provin][0],
    };
    this.data.areas = {
      list: areas[citys[provin][0]],
      defaultValue: areas[citys[provin][0]][0],
    },
    this.address = [];
    this.address.push(provin);
    this.address.push(citys[provin][0]);
    this.address.push(areas[citys[provin][0]][0]);
    this.props.onChange(this.address);
  }

  handleChangeCity(city) {
    this.address[1] = city;
    this.address[2] = areas[city][0];
    this.data.areas = {
      list: areas[city],
      defaultValue: areas[city][0],
    };
    this.props.onChange(this.address);
  }

  handleChangeArea(area) {
    this.address[2] = area;
    this.props.onChange(this.address);
  }

  handleClose () {
    this.props.onClose(this.address)
  }

  render () {
    this.initDefaultData();
    return <div className="ui-picker-address">
      <Popup
        onClose={this.handleClose.bind(this)}
        visible={this.props.visible}>
        <Picker
          onChange={this.handleChangeProvin.bind(this)}
          data={this.data.provins}
        />
        <Picker
          onChange={this.handleChangeCity.bind(this)}
          data={this.data.citys}
        />
        <Picker
          onChange={this.handleChangeArea.bind(this)}
          data={this.data.areas}
        />
      </Popup>
    </div>
  }
}

PickerAddress.propTypes = propTypes;

export default PickerAddress;
