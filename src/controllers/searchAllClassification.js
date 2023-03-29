const { prismaClient } = require('../model/prismaClient');

class searchAllClassification {
  async searchAllClassification(req, res) {
    const classification = await prismaClient.tableClassification.findMany({
      orderBy: [
        {
          P: 'desc'
        },
        {
          V: 'desc'
        },
        {
          SG: 'desc'
        }
      ]
    });

    // Check for ties on P and sort by V or SG if necessary
    if (classification.length > 1 && classification[0].P === classification[1].P) {
      if (classification.length > 2 && classification[1].V === classification[2].V) {
        // If there is a tie on both P and V, sort by SG
        classification.sort((a, b) => b.SG - a.SG);
      } else {
        // Otherwise, sort by V
        classification.sort((a, b) => b.V - a.V);
      }
    }

    return classification.length > 0
      ? res.status(200).json(classification)
      : res.status(204).send();
  }
}

module.exports = { searchAllClassification }
