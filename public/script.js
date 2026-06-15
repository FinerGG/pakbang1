document.getElementById('problemForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // ป้องกันไม่ให้ฟอร์มโหลดหน้าใหม่

    const webhookUrl = 'https://discord.com/api/webhooks/1386230640042704978/0NCK4s4ZmqbCCp9M_n9QmWVwYceQxkumcPDtBmyCoSPRrRtCDWFBCgFs2YWL_9k3iC-j'; // Webhook URL ของคุณ

    // ลบ const problemTitle และ const reporterInfo ออก
    const problemDescription = document.getElementById('problemDescription').value;
    const problemImageInput = document.getElementById('problemImage'); // ช่อง input สำหรับรูปภาพ

    const responseMessage = document.getElementById('responseMessage');
    responseMessage.style.display = 'none'; // ซ่อนข้อความตอบกลับก่อนส่งใหม่

    // ตรวจสอบว่ามีข้อมูลจำเป็นหรือไม่ (เหลือแค่ รายละเอียดปัญหา)
    if (!problemDescription) {
        responseMessage.textContent = 'กรุณากรอกรายละเอียดปัญหาให้ครบถ้วน';
        responseMessage.className = 'error';
        responseMessage.style.display = 'block';
        return; // หยุดการทำงานถ้าข้อมูลไม่ครบ
    }

    const imageFile = problemImageInput.files[0]; // รับไฟล์รูปภาพ (ถ้ามี)
    const MAX_FILE_SIZE_MB = 8; // กำหนดขนาดไฟล์สูงสุดที่อนุญาต (8 MB)
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (imageFile) {
        // ตรวจสอบชนิดไฟล์
        if (!imageFile.type.startsWith('image/')) {
            responseMessage.textContent = 'กรุณาเลือกไฟล์รูปภาพเท่านั้น';
            responseMessage.className = 'error';
            responseMessage.style.display = 'block';
            return;
        }
        // ตรวจสอบขนาดไฟล์
        if (imageFile.size > MAX_FILE_SIZE_BYTES) {
            responseMessage.textContent = `ไฟล์รูปภาพต้องมีขนาดไม่เกิน ${MAX_FILE_SIZE_MB} MB`;
            responseMessage.className = 'error';
            responseMessage.style.display = 'block';
            return;
        }
    }

    const footerText = `By. DearKung`;

    // เตรียมค่าสำหรับ Discord Embed โดยใช้ Markdown (เหลือแค่รายละเอียดปัญหา)
    const formattedProblemDescription = `\`\`\`\n${problemDescription}\n\`\`\``; // Triple backticks for multiline code block

    // สร้าง Embed object (เหลือแค่ field "Details")
    const discordEmbed = {
        title: "Problem Report", // เปลี่ยนชื่อหัวข้อเป็น "Problem Report" แทน "Report" เพื่อความชัดเจน
        description: "A new problem has been reported.", // เปลี่ยนคำอธิบาย
        color: 16711680, // สีแดง
        fields: [
            {
                name: "Details", // เหลือแค่ Details
                value: formattedProblemDescription,
                inline: false
            }
        ],
        footer: {
            text: footerText
        }
    };

    // สร้าง FormData object สำหรับส่งข้อมูลแบบ multipart/form-data
    const formData = new FormData();
    formData.append('payload_json', JSON.stringify({ embeds: [discordEmbed] })); // ต้องแนบ Embeds ในรูปของ payload_json

    if (imageFile) {
        formData.append('file', imageFile); // แนบไฟล์รูปภาพ
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            responseMessage.textContent = 'รายงานปัญหาของคุณถูกส่งเรียบร้อยแล้ว!';
            responseMessage.className = 'success';
            responseMessage.style.display = 'block';
            document.getElementById('problemForm').reset(); // ล้างฟอร์ม
        } else {
            const errorData = await response.json();
            responseMessage.textContent = `เกิดข้อผิดพลาดในการส่งรายงาน: ${errorData.message || response.statusText}`;
            responseMessage.className = 'error';
            responseMessage.style.display = 'block';
            console.error('Error sending message to Discord:', response.status, response.statusText, errorData);
        }
    } catch (error) {
        responseMessage.textContent = 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาตรวจสอบอินเทอร์เน็ตของคุณ';
        responseMessage.className = 'error';
        responseMessage.style.display = 'block';
        console.error('Network error:', error);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var tutorBtn = document.getElementById('tutorBtn');
    var expiredOverlay = document.getElementById('expiredOverlay');
    var expiredBtn = document.getElementById('expiredBtn');
    if (tutorBtn && expiredOverlay && expiredBtn) {
        tutorBtn.onclick = function(e) {
            e.preventDefault();
            expiredOverlay.style.display = 'flex';
        };
        expiredBtn.onclick = function() {
            expiredOverlay.style.display = 'none';
        };
    }
});