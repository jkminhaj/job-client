import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PDF = ({ data, name }) => {
  const primaryColor = '#3b82f6'; // Replace with your primary color
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: 'white',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: primaryColor,
    },
    block: {
      display: 'flex',
      flexDirection: 'row',
      gap:'10',
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
          {data.map((job, index) => (
            <View key={index} style={styles.block}>
              <Text style={styles.label}>Job Title:</Text>
              <Text style={styles.text}>{job.job_title}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDF;
