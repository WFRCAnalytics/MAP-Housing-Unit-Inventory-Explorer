/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
// used to create this list on the fly
const yearChartDefinitions = [
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1840-1890_single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1840-1890_duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1840-1890_single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1840-1890_condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1840-1890_townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1840-1890_mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1840-1890_mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1840-1890' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1840-1890_apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1900-1950_single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1900-1950_duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1900-1950_single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1900-1950_condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1900-1950_townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1900-1950_mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1900-1950_mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1900-1950' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1900-1950_apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1960_single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1960_duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1960_single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1960_condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1960_townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1960_mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1960_mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1960' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1960_apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1970_single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1970_duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1970_single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1970_condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1970_townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1970_mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1970_mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1970' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1970_apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1980_single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1980_duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1980_single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1980_condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1980_townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1980_mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1980_mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1980' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1980_apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1990_single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1990_duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1990_single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1990_condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1990_townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1990_mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1990_mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '1990' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_1990_apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2000_single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2000_duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2000_single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2000_condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2000_townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2000_mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2000_mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2000' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2000_apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2010_single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2010_duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2010_single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2010_condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2010_townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2010_mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2010_mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2010' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2010_apartment',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2020_single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'duplex') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2020_duplex',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'single_family_adu') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2020_single_family_adu',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'condo') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2020_condo',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'townhome') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2020_townhome',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'mobile_home_park') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2020_mobile_home_park',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'mixed th/single_family') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2020_mixed th/single_family',
        statisticType: 'sum',
    },
    {
        onStatisticField: "CASE WHEN (BLT_DECADE = '2020' AND SUBTYPE = 'apartment') THEN UNIT_COUNT ELSE 0 END",
        outStatisticFieldName: 'year_2020_apartment',
        statisticType: 'sum',
    },
];
