/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
// used to create this list on the fly
const yearChartDefinitions = [
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1840-1890.single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1900-1950.single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1960.single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1970.single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1980.single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1990.single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2000.single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2010.single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2020.single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1840-1890.duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1900-1950.duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1960.duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1970.duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1980.duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1990.duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2000.duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2010.duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2020.duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1840-1890.single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1900-1950.single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1960.single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1970.single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1980.single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2000.single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2010.single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2020.single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1840-1890.condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1900-1950.condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1960.condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1970.condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1980.condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1990.condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2000.condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2010.condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2020.condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1840-1890.townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1900-1950.townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1960.townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1970.townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1980.townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1990.townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2000.townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2010.townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2020.townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1840-1890.mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1900-1950.mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1960.mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1970.mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1980.mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1990.mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2000.mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2010.mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2020.mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1840-1890.mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1900-1950.mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1960.mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1970.mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1980.mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1990.mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2000.mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2010.mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2020.mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1840-1890.apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1900-1950.apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1960.apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1970.apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1980.apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '1990.apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2000.apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2010.apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: '2020.apartment',
        statisticType: 'sum',
    },
];


