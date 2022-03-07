// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/huanghui/Documents/github/sirius/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": ((props) => {
        const React = require('react');
        const { default: getDemoRenderArgs } = require('/Users/huanghui/Documents/github/sirius/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { usePrefersColor, context } = require('dumi/theme');

        
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        })
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('/Users/huanghui/Documents/github/sirius/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/",
        "component": require('/Users/huanghui/Documents/github/sirius/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1646647556713,
          "title": "hpys - 组件库",
          "slugs": [
            {
              "depth": 3,
              "value": "组件内容",
              "heading": "组件内容"
            }
          ]
        },
        "title": "hpys - 组件库 - hpys"
      },
      {
        "path": "/hpys",
        "component": require('/Users/huanghui/Documents/github/sirius/packages/hpys/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/hpys/README.md",
          "updatedTime": 1646636058000,
          "slugs": [
            {
              "depth": 1,
              "value": "hpys",
              "heading": "hpys"
            },
            {
              "depth": 2,
              "value": "Usage",
              "heading": "usage"
            }
          ],
          "title": "hpys",
          "group": {
            "path": "/hpys",
            "title": "Hpys"
          }
        },
        "title": "hpys - hpys"
      },
      {
        "path": "/icon",
        "component": require('/Users/huanghui/Documents/github/sirius/packages/icon/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/icon/README.md",
          "updatedTime": 1646636058000,
          "slugs": [
            {
              "depth": 1,
              "value": "@hpys/icon",
              "heading": "hpysicon"
            },
            {
              "depth": 2,
              "value": "Usage",
              "heading": "usage"
            },
            {
              "depth": 3,
              "value": "代码演示",
              "heading": "代码演示"
            }
          ],
          "title": "@hpys/icon",
          "hasPreviewer": true,
          "group": {
            "path": "/icon",
            "title": "Icon"
          }
        },
        "title": "@hpys/icon - hpys"
      }
    ],
    "title": "hpys",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
