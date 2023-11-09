import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PDF = ({ data, name }) => {
  const primaryColor = '#3b82f6';
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: 'white',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: primaryColor,
    },
    block: {
      display: 'flex',
      flexDirection: 'row',
      gap: '10',
      marginBottom: 5,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: primaryColor,
    },
    text: {
      fontSize: 14,
      marginBottom: 10,
    },
    border:{
      border:1,
      marginVertical:5,
      maxWidth:'50%'
    }
  });

  return (
    <Document>
      <Page size='A4'>
        <View style={styles.page}>
          <Text style={styles.title}>Job Application Summary</Text>
          <View style={styles.block}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.text}>{name}</Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.label}>Total Job Applied :</Text>
            <Text style={styles.text}>{data.length}</Text>
          </View>
          {data.map((job, index) => (
            <View key={index} style={styles.border}>
              <Text style={styles.block}>
                <Text style={styles.label}>Job Title:</Text>
                <Text style={styles.text}>{job.job_title}</Text>
              </Text>
              <Text style={styles.block}>
                <Text style={styles.label}>Job Category:</Text>
                <Text style={styles.text}>{job.job_category}</Text>
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDF;
