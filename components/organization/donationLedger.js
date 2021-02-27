import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/core'
import PaginationList from 'react-pagination-list'

import Section from '../common/section'
import UnderlinedHeading from '../common/underlinedHeading'
import { getOrgDonationLedger } from '../../client'

import { useLocalStorage } from '../../utils/useLocalStorage'
import { localStorageOrgKey } from '../../utils/constants'
import TextLink from '../common/textLink'

const OrgSettingsSection = () => {
  const [ledgerLoading, setLedgerLoading] = useState(true)
  const [ledger, setLedger] = useState(undefined)

  const [currentOrgId, _] = useLocalStorage(localStorageOrgKey, '') // eslint-disable-line  

  async function fetchLedger () {
    try {
      const res = await getOrgDonationLedger({ orgId: currentOrgId })
      setLedger(res.ledger)
    } catch (e) {} finally {
      setLedgerLoading(false)
    }
  }

  useEffect(() => {
    fetchLedger()
  }, [])

  return (
    <Section
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '4rem 7.5rem' }}
      backgroundColor='lightRock'
    >
      <UnderlinedHeading
        as='h1'
        text='Donation Ledger'
        align='center'
        marginBottom='3rem'
      />
      {!ledgerLoading && (
        <Box width='100%' padding='0 10% 0 10%' margin='auto'>
          <PaginationList
            data={ledger.sort((a, b) => b.totalPaid - a.totalPaid)}
            pageSize={20}
            renderItem={(item, key) => (
              <>
                <TextLink key={key} text={`${item.registry.toUpperCase()} ${item.name}: $${(item.totalPaid / 100000).toFixed(2)}`} external href={`https://maintainer.flossbank.com/package/${item.id}`} />
                <Box
                  as='hr'
                  borderColor='white'
                  margin='0.5rem'
                />
              </>
            )}
          />
        </Box>
      )}
    </Section>
  )
}

export default OrgSettingsSection
