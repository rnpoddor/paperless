// @flow

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import {TableRow, TableCell} from './TableRow';
import Params from './Params';
import CompleteListSorting from './CompleteListSorting';

import scale_svg from '../../metadata/common/scale_svg';

export default function MainProps(props) {

  const {ox, cnstr, block, task} = props;
  let {note, calc_order, calc_order_row} = ox;
  if(calc_order_row && calc_order_row.note && !note) {
    note = calc_order_row.note;
  }
  const name = ox.prod_name && ox.prod_name(true);

  const rows = [];

  if(!name) {
    rows.push(<TableRow key="name">
      <TableCell>Изделие</TableCell>
      <TableCell>не выбрано</TableCell>
    </TableRow>);
  }
  else {
    rows.push(<TableRow key="sub">
      <TableCell>
        <div ref={(el) => {
          if(el){
            el.innerHTML = ox.svg ? scale_svg(ox.svg, {width: 130, height: 110, zoom: 0.2}, 0) : "нет эскиза";
          }
        }}/>
      </TableCell>
      <TableCell>
        <Table>
          <TableBody>

            {task && <TableRow>
              <TableCell>Задание</TableCell>
              <TableCell>{task}</TableCell>
            </TableRow>}

            <TableRow>
              <TableCell>Расчет</TableCell>
              <TableCell>{calc_order.number_doc}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Изделие</TableCell>
              <TableCell>{name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Габарит</TableCell>
              <TableCell>{`${ox.x}x${ox.y} S:${ox.s.toFixed(3)}`}</TableCell>
            </TableRow>

            {block && <TableRow>
              <TableCell>Блок</TableCell>
              <TableCell>{block}</TableCell>
            </TableRow>}

          </TableBody>
        </Table>
      </TableCell>
    </TableRow>);

    rows.push(<TableRow key="divider"><TableCell /><TableCell /></TableRow>);

    rows.push(...Params({ox, cnstr: 0}));

    cnstr && rows.push(...Params({ox, cnstr}));

    rows.push(...CompleteListSorting({ox, cnstr}));

    note && rows.push(<TableRow key="note">
      <TableCell>Инфо</TableCell>
      <TableCell>{note}</TableCell>
    </TableRow>);
  }

  return [
    <Table key="table">
      <TableBody>{rows}</TableBody>
    </Table>
  ];
}
