
/**
 *  @param {String[]} code
 *  @param {String} mainCode
 *  @return {String}
*/

const getCode = (code, mainCode) => {

    // const { returnType, functionName, functionParameter } = problemDetails;
    console.log(code);
    return `
import java.util.*;
                   
public class Main {
    public static void main(String ...args) {
        CodeKing codeKing = new CodeKing();
        ${ code.map(c => c).join('\n\t') }
    }
}

class CodeKing {
    ${mainCode}
}

    `
}

/**
 *  @param {String[]} code
 *  @param {String} userCode
 *  @return {String}
 */

const getMainCode = (code, userCode) => {
    return `
import java.util.*;

public class Main {
    public static void main(String ...args) {
        CodeKing codeKing = new CodeKing();
        ${ code.map(c => c).join('\n\t') }
    }
}
${userCode}
`;
}


module.exports = { getCode }
