import React from 'react'
// import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import Tooltip from '@material-ui/core/Tooltip'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
// import { faTelegram } from "@fortawesome/free-brands-svg-icons";
// import { faTwitter } from "@fortawesome/free-brands-svg-icons";
// import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import './_socialshare.scss'

const SocialShare = React.memo(function SocialShare(props) {
  // const BASE_URL = '#'
  const blank = '_blank'
  const tooltipText =
    props.locales.length > 0
      ? props.locales[15].translate_value !== ''
        ? props.locales[15].translate_value
        : props.locales[15].translate_key
      : ''
  return (
    <>
      {props.isPrimary ? (
        <Tooltip title={tooltipText} placement="bottom">
          <div className="c-social">
            <a href={props.link} className="c-social__link" download>
              <Button
                className="c-social__download-button"
                variant="contained"
                size="small"
              >
                <span className="c-social__link-download-span">Descargar</span>
                <CloudDownloadIcon />
              </Button>
            </a>
          </div>
        </Tooltip>
      ) : (
        <Tooltip title={tooltipText} placement="bottom">
          <div className="c-social">
            <a href={props.link} target={blank} className="c-social__link">
              <Button variant="contained" size="small">
                <span className="c-social__link-download-span">Descargar</span>
                <CloudDownloadIcon />
              </Button>
            </a>
          </div>
          {/* <a href={BASE_URL} target={blank} className="c-social__link">
                <Fab className="c-social__button--whatsapp" size="small">
                    <FontAwesomeIcon
                        className="c-social__icon"
                        icon={faWhatsapp}
                    />
                </Fab>
            </a>
            <a href={BASE_URL} target={blank} className="c-social__link">
                <Fab className="c-social__button--facebook" size="small">
                    <FontAwesomeIcon
                        className="c-social__icon"
                        icon={faFacebookF}
                    />
                </Fab>
            </a>
            <a href={BASE_URL} target={blank} className="c-social__link">
                <Fab className="c-social__button--telegram" size="small">
                    <FontAwesomeIcon
                        className="c-social__icon"
                        icon={faTelegram}
                    />
                </Fab>
            </a>
            <a href={BASE_URL} target={blank} className="c-social__link">
                <Fab className="c-social__button--twitter" size="small">
                    <FontAwesomeIcon
                        className="c-social__icon"
                        icon={faTwitter}
                    />
                </Fab>
            </a>
        </div> */}
        </Tooltip>
      )}
    </>
  )
})

export default SocialShare
