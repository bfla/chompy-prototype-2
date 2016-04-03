#! /bin/bash

DEPLOY_HOSTNAME=galaxy.meteor.com \
  meteor deploy \
    chompy.meteorapp.com \
    --settings settings-prod.json