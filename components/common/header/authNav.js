import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PropTypes from 'prop-types'

import {
  useTheme,
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/core'

import { useLocalStorage } from '../../../utils/useLocalStorage'
import { localStorageOrgKey } from '../../../utils/constants'

const AuthNav = ({ user, onLogout }) => {
  const router = useRouter()
  const [currentOrgId, _] = useLocalStorage(localStorageOrgKey, '') // eslint-disable-line

  const [isExpanded, setIsExpanded] = useState(false)
  const { colors } = useTheme()

  const menuButtonActiveStyles = {
    backgroundColor: 'lightPuddle',
    boxShadow: `0 0 0 10px ${colors.lightPuddle}`
  }

  const itemFocusStyles = {
    color: 'lightPuddle',
    backgroundColor: 'ocean',
    outline: 'none !important'
  }

  const itemActiveStyles = {
    color: 'ocean',
    backgroundColor: 'lightPuddle'
  }

  const handleNav = (dest) => router.push(dest)

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          {!isOpen && setIsExpanded(false)}
          <MenuButton
            as={Button}
            height='auto'
            aria-label='User menu'
            borderRadius='0'
            _hover={menuButtonActiveStyles}
            _expanded={menuButtonActiveStyles}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Box
              as='span'
              display={{ base: 'none', sm: 'initial' }}
              fontWeight='500'
              marginRight='1rem'
            >
              {user.email}
            </Box>
            <Box
              as='span'
              display='inline-flex'
              width='3rem'
              height='3rem'
              alignItems='center'
              justifyContent='center'
              borderRadius='50%'
              fontWeight='400'
              backgroundColor='rock'
              color='white'
              fontSize='1.25rem'
              textTransform='uppercase'
            >
              {user.email.charAt(0)}
            </Box>
            <Icon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              marginLeft='.5rem'
              size='1.5rem'
            />
          </MenuButton>
          <MenuList backgroundColor='lightRock'>
            <MenuItem
              _focus={itemFocusStyles}
              _active={itemActiveStyles}
              onClick={() => handleNav(`/organization/${currentOrgId}`)}
            >
              <Link href={`/organization/${currentOrgId}`}>
                <a>
                  <Box as='span' display='flex' alignItems='center'>
                    <Icon name='home' marginRight='.5rem' />
                    <span>Dashboard</span>
                  </Box>
                </a>
              </Link>
            </MenuItem>
            <MenuItem
              _focus={itemFocusStyles}
              _active={itemActiveStyles}
              onClick={() => handleNav('/find-organization')}
            >
              <Link href='/find-organization'>
                <a>
                  <Box as='span' display='flex' alignItems='center'>
                    <Icon name='search' marginRight='.5rem' />
                    <span>Search organizations</span>
                  </Box>
                </a>
              </Link>
            </MenuItem>
            <MenuItem
              _focus={itemFocusStyles}
              _active={itemActiveStyles}
              onClick={() => handleNav('/faq')}
            >
              <Link href='/faq'>
                <a>
                  <Box as='span' display='flex' alignItems='center'>
                    <Icon name='question' marginRight='.5rem' />
                    <span>FAQ</span>
                  </Box>
                </a>
              </Link>
            </MenuItem>
            <MenuItem
              _focus={itemFocusStyles}
              _active={itemActiveStyles}
              onClick={() => handleNav('/how-it-works')}
            >
              <Link href='/how-it-works'>
                <a>
                  <Box as='span' display='flex' alignItems='center'>
                    <Icon name='info' marginRight='.5rem' />
                    <span>How it works</span>
                  </Box>
                </a>
              </Link>
            </MenuItem>
            <MenuItem
              _focus={itemFocusStyles}
              _active={itemActiveStyles}
              onClick={() => handleNav(`/organization/${currentOrgId}/settings`)}
            >
              <Link href={`/organization/${currentOrgId}/settings`}>
                <a>
                  <Box as='span' display='flex' alignItems='center'>
                    <Icon name='settings' marginRight='.5rem' />
                    <span>Settings</span>
                  </Box>
                </a>
              </Link>
            </MenuItem>
            <MenuItem
              _focus={itemFocusStyles}
              _active={itemActiveStyles}
              onClick={onLogout}
            >
              <Link href='/'>
                <a>
                  <Box as='span' display='flex' alignItems='center'>
                    <Icon name='unlock' marginRight='.5rem' />
                    <span>Log out</span>
                  </Box>
                </a>
              </Link>
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  )
}

AuthNav.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default AuthNav
