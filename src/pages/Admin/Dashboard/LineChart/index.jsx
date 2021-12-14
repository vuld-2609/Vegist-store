import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';

const generateOptions = (data, sortType) => {
  const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));
  const { Option } = Select;

  return {
    chart: {
      height: 500,
    },
    title: {
      text: 'Vegist',
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#F3585B'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: 'right',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        `<td style="padding:0"><b>{point.y} ${sortType.unit} </b></td></tr>`,
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: sortType.title,
        data: data.map((item) => item[sortType.data]),
      },
    ],
  };
};

const sortData = [
  { id: 1, value: 'user', title: 'Nguời dùng' },
  { id: 1, value: 'product', title: 'Sản phẩm' },
  { id: 1, value: 'revenue', title: 'Doanh thu' },
];

export default function LineChart({ data }) {
  const { t } = useTranslation();
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState('all');
  const [sort, setSort] = useState('revenue');

  useEffect(() => {
    let customData = [];
    let sortType = {};
    switch (reportType) {
      case 'all':
        customData = data;
        break;
      case '30':
        customData = data.slice(Math.max(data.length - 30, 1));
        break;
      case '7':
        customData = data.slice(Math.max(data.length - 7, 1));
        break;
      case '1':
        customData = data.slice(Math.max(data.length - 2, 1));
        break;
      default:
        customData = data;
        break;
    }

    switch (sort) {
      case 'revenue':
        sortType = {
          title: 'Doanh thu',
          unit: 'VNĐ',
          data: 'Revenue',
        };
        break;
      case 'product':
        sortType = {
          title: 'Sản phẩm',
          unit: 'sản phẩm',
          data: 'Product',
        };
        break;
      case 'user':
        sortType = {
          title: 'Người dùng',
          unit: 'Người',
          data: 'User',
        };
        break;
      default:
        break;
    }

    setOptions(generateOptions(customData, sortType));
  }, [data, reportType, sort]);

  const handelChangeSort = (e) => {
    setSort(e);
  };

  return (
    <>
      <div className="line-chart">
        <div className="line-chart__sort">
          <div className="line-chart__sort--left">
            <button
              onClick={() => setReportType('all')}
              className={`button button__report ${
                reportType === 'all' ? 'button__report--active' : ''
              } `}
            >
              Tất cả
            </button>
            <button
              className={`button button__report ${
                reportType === '30' ? 'button__report--active' : ''
              } `}
              onClick={() => setReportType('30')}
            >
              30 ngày
            </button>
            <button
              className={`button button__report ${
                reportType === '7' ? 'button__report--active' : ''
              } `}
              onClick={() => setReportType('7')}
            >
              7 ngày
            </button>
            <button
              className={`button button__report ${
                reportType === '1' ? 'button__report--active' : ''
              } `}
              onClick={() => setReportType('1')}
            >
              Hôm nay
            </button>
          </div>
          <div className="line-chart__sort--right">
            <span className="topbar__right--text">{t('products.sort by')}: </span>
            <Select
              showSearch
              style={{ width: 160 }}
              placeholder={t(`products.placeholder`)}
              optionFilterProp="children"
              onChange={handelChangeSort}
              defaultValue="revenue"
            >
              {sortData.map((item, index) => (
                <Option value={item.value} key={`option-${item.value}`}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}
